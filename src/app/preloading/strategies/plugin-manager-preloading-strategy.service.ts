import { Injectable, Inject, isDevMode, Injector } from '@angular/core';
import { PreloadingStrategy, Route, Routes, Router } from '@angular/router';
import { Observable, EMPTY, race, NEVER } from 'rxjs';
import { switchMap, first, switchMapTo, catchError, filter, tap } from 'rxjs/operators';
import { PRELOADING_STRATEGY_PLUGIN } from '../tokens/preloading-strategy-plugin';
import { PRELOADING_GUARD } from '../tokens/preloading-guard';
import { IPreloadingStrategyPlugin } from '../interfaces/preloading-strategy-plugin';
import { IPreloadingGuard } from '../interfaces/preloading-guard';
import { PreloadingError } from '../utils/preloading-error';
import { observify } from 'src/app/shared/functions';
import { PRELOADING_STRATEGY_PLUGIN_CONFIG, PRELOADING_CONFIG } from '../tokens';
import { IPreloadingPluginConfig, IRoutePreloadingConfig } from '../interfaces';
import { PreloadingHook } from '../enums';
import { IPreloadingConfig } from '../interfaces/preloading-config';
import { PreloadingEventBusService } from '../services';
import { PreloadingStart } from '../classes/started-preloading-event';
import { PreloadingDone } from '../classes';


@Injectable({
  providedIn: 'root',
  deps: [
    PRELOADING_STRATEGY_PLUGIN_CONFIG,
    PRELOADING_STRATEGY_PLUGIN,
    PRELOADING_GUARD,
  ]
})
export class PluginManagerPreloadingStrategy implements PreloadingStrategy {

  public preloadedRoutes: string[] = [];

  private get preloadingPlugins(): IPreloadingStrategyPlugin[] {
    if (!!this._preloadingPlugins) {
      return this._preloadingPlugins;
    }

    if (!this.plugins) {
      this._preloadingPlugins = [];
      return this._preloadingPlugins;
    }

    this._preloadingPlugins = Array.isArray(this.plugins)
      ?  this.plugins
      : [this.plugins];

    return this._preloadingPlugins;
  }

  private get sortedPlugins(): IPreloadingStrategyPlugin[] {
    if (!!this._sortedPlugins) {
      return this._sortedPlugins;
    }

    this._sortedPlugins = this.preloadingPlugins.sort((a, b) => {
      const configOfA = this.getPluginConfig(a);
      const configOfB = this.getPluginConfig(b);

      if (!configOfA) {
        return 1;
      }

      if (!configOfB) {
        return -1;
      }

      return configOfA.priority > configOfB.priority ? -1 : 1;
    });

    return this._sortedPlugins;
  }

  private get recognizedRoutes(): string[] {
    return Object.keys(this.flattenRouterConfig());
  }

  private get router(): Router {
    return this.injector.get(Router);
  }

  private startedPreloading: boolean;

  private _sortedPlugins: IPreloadingStrategyPlugin[];
  private _preloadingPlugins: IPreloadingStrategyPlugin[];

  constructor(
    @Inject(PRELOADING_STRATEGY_PLUGIN)
    private plugins: IPreloadingStrategyPlugin | IPreloadingStrategyPlugin[],
    @Inject(PRELOADING_GUARD)
    private preloadingGuard: IPreloadingGuard,
    @Inject(PRELOADING_CONFIG)
    private preloadingConfig: IPreloadingConfig,
    private preloadingEventBus: PreloadingEventBusService,
    private injector: Injector,
  ) {}

  public preload(
    route: Route,
    load: () => Observable<any>
  ): Observable<any> {
    if (!this.startedPreloading) {
      this.startedPreloading = true;
      this.preloadingEventBus.signal(new PreloadingStart(route));
    }

    if (!this.recognizedRoutes.includes(route.path)) {
      return EMPTY;
    }

    if (this.preloadedRoutes.includes(route.path)) {
      return EMPTY;
    }

    return this.getPreloaderStreamFor(route, load);
  }

  private getPreloaderStreamFor(
    route: Route,
    load: () => Observable<any>
  ): Observable<any[]> {
    const routeConfig = this.getRouteConfig(route);
    const {
      preAction: routePreAction,
      postAction: routePostAction,
      preloadingHook: routePreloadingHook
    } = routeConfig;

    const combined = [];

    for (const plugin of this.sortedPlugins) {
      if (!plugin.supports(route)) {
        continue;
      }

      const pluginConfig = this.getPluginConfig(plugin);
      if (!pluginConfig) {
        continue;
      }

      const { preloadingHook, preAction, postAction } = pluginConfig;

      const hookToUse = routePreloadingHook || preloadingHook;
      const guardSignal$ = this.getGuardSignalFor(hookToUse);

      const streamOfPlugin = guardSignal$.pipe(
        switchMapTo(
          observify(
            plugin.shouldPreload(route)
          ).pipe(
            first(),
            switchMap(preload => {
              if (!preload) {
                return NEVER;
              }

              if (typeof routePreAction === 'function') {
                routePreAction();
              }

              if (typeof preAction === 'function') {
                preAction();
              }

              this.preloadedRoutes.push(route.path);
              if (isDevMode()) {
                this.logDebugInfo(route, plugin);
              }

              return load().pipe(
                tap(() => {
                  if (this.isLastRoute(route)) {
                    this.preloadingEventBus.signal(new PreloadingDone(route));
                  }

                  if (typeof routePostAction === 'function') {
                    routePostAction();
                  }

                  if (typeof postAction === 'function') {
                    postAction();
                  }
                })
              );
            }),
            catchError(error => {
              if (error instanceof PreloadingError) {
                if (isDevMode()) {
                  this.logPreloadingError(error);
                }

                return NEVER;
              } else {
                throw error;
              }
            }),
          )
        ),
      );

      combined.push(streamOfPlugin);
    }

    return race(combined);
  }

  private isLastRoute(route: Route): boolean {
    const flattenedRoutes = this.flattenRouterConfig();
    return flattenedRoutes.indexOf(route.path) === flattenedRoutes.length - 1;
  }

  private logDebugInfo(route: Route, plugin: IPreloadingStrategyPlugin): void {
    console.warn('PRELOADING...');
    console.log(`LOADING ROUTE: ${route.path} (BY: ${plugin.name})`);
  }

  private logPreloadingError(error: PreloadingError): void {
    console.error('PRELOADING ERROR...');
    console.error(error.message);
    console.error(error.stack);
  }

  private flattenRouterConfig(config: Routes = this.router.config): string[] {
    return config.reduce((acc: string[], curr) => {
        if (curr.loadChildren) {
          acc.push(curr.path);
          return acc;
        }

        if (curr.children) {
          const children = this.flattenRouterConfig(curr.children);
          for (const child of children) {
            acc.push(child);
          }

          return acc;
        }

        return acc;
      },
      [] as string[]
    );
  }

  private getPluginConfig(
    plugin: IPreloadingStrategyPlugin
  ): IPreloadingPluginConfig {
    if (!!plugin) {
      return null;
    }

    const { pluginConfigs } = this.preloadingConfig;
    return pluginConfigs.find(config => {
      const configsPlugin = this.injector.get(config.plugin);

      if (!!configsPlugin === false) {
          return false;
      }

      return  !!config
          &&  !!config.plugin
          &&  configsPlugin.name === plugin.name
          ||  false;
    }) || null;
  }

  private getGuardSignalFor(
    preloadingHook: PreloadingHook
  ): Observable<any> {
    return this.preloadingGuard.hookSignal$.pipe(
      filter(hook => hook === preloadingHook),
    );
  }

  private getRouteConfig(route: Route): IRoutePreloadingConfig {
    const { routeConfigs } = this.preloadingConfig;
    const ownConfig = routeConfigs.find(config => config.route === route.path);

    const inlineConfig = route.data['preloading'];

    return {
      route: route.path,
      ...(!!ownConfig ? ownConfig : {}),
      ...(!!inlineConfig ? inlineConfig : {}),
    };
  }
}
