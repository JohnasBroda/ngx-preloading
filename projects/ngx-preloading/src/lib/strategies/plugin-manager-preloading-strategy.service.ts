import { Injectable, Inject, isDevMode, Injector, NgZone } from '@angular/core';
import { PreloadingStrategy, Route, Routes, Router } from '@angular/router';
import { Observable, EMPTY, race, NEVER, Subject, of } from 'rxjs';
import {
  switchMap,
  first,
  switchMapTo,
  catchError,
  filter,
  tap
} from 'rxjs/operators';
import {
  IPreloadingStrategyPlugin,
  IHookActionContext
} from '../interfaces';
import {
  PreloadingEventBusService,
  PluginManagerService,
  ConfigManagerService,
  PreloadingSchedulerService
} from '../services';
import { PreloadingDone, PreloadingStart } from '../classes';
import { observify, requestIdleFallback, outsideZone } from '../functions';
import { PRELOADING_GUARD, WINDOW } from '../tokens';
import { PreloadingError } from '../utils';
import { PreloadingHook } from '../enums';
import { PreloadingGuard } from 'lib/guards';


@Injectable({
  providedIn: 'root',
  deps: [PRELOADING_GUARD]
})
export class PluginManagerPreloadingStrategy implements PreloadingStrategy {

  private preloadedRoutes: string[] = [];

  private get recognizedRoutes(): string[] {
    return Object.values(this.flattenRouterConfig());
  }

  private get router(): Router {
    return this.injector.get(Router);
  }

  private get requestIdleCallback(): any {
    return (
      (!!this.window && this.window.requestIdleCallback)
      || requestIdleFallback
    );
  }

  private startedPreloading: boolean;

  constructor(
    @Inject(WINDOW)
    private readonly window: Window | null,
    @Inject(PRELOADING_GUARD)
    private readonly preloadingGuard: PreloadingGuard,
    private readonly preloadingEventBus: PreloadingEventBusService,
    private readonly plugins: PluginManagerService,
    private readonly configs: ConfigManagerService,
    private readonly scheduler: PreloadingSchedulerService,
    private readonly injector: Injector,
    private readonly zone: NgZone,
  ) {}

  public preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (!route || !route.path) {
      return EMPTY;
    }

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
    const routeConfig = this.configs.getRouteConfig(route);
    const {
      preAction: routePreAction,
      postAction: routePostAction,
      category
    } = routeConfig;

    const categoryConfig = this.configs.getCategoryConfig(category);
    const {
      preAction: categoryPreAction,
      postAction: categoryPostAction
    } = categoryConfig;

    const combined = [];

    for (const plugin of this.plugins.sortedPlugins) {
      const effectiveConfig = this.configs.getEffectiveConfig(
        route, plugin, category
      );

      if (!plugin || !plugin.supports(route, effectiveConfig)) {
        continue;
      }

      const pluginConfig = this.configs.getPluginConfig(plugin);
      const {
        preAction: pluginPreAction,
        postAction: pluginPostAction
      } = pluginConfig;

      const { preloadingHook, useIdleTime, triggerChangeDetection } = effectiveConfig;

      const guardSignal$ = this.getGuardSignalFor(preloadingHook);
      const zoneToUse = triggerChangeDetection ? this.zone : null;
      const shouldPreload$ = observify(plugin.shouldPreload(route, effectiveConfig));

      const hookActionContext = {
        route, plugin, category, effectiveConfig
      } as Partial<IHookActionContext>;

      const streamOfPlugin = guardSignal$.pipe(
        outsideZone(zoneToUse),
        switchMapTo(shouldPreload$.pipe(
          first(),
          switchMap(preload => {
            if (!preload) {
              return NEVER;
            }

            const preActionContext = {
              ...hookActionContext,
              actionType: 'pre'
            } as IHookActionContext;

            if (typeof categoryPreAction === 'function') {
              categoryPreAction(preActionContext);
            }

            if (typeof routePreAction === 'function') {
              routePreAction(preActionContext);
            }

            if (typeof pluginPreAction === 'function') {
              pluginPreAction(preActionContext);
            }

            this.preloadedRoutes.push(route.path);
            if (isDevMode()) {
              this.logDebugInfo(route, plugin);
            }

            const scheduler$ = useIdleTime
              ? this.scheduleForIdleTime()
              : of(void 0);

            return scheduler$.pipe(
              switchMapTo(
                load().pipe(
                  tap(() => {
                    if (this.isLastRoute(route)) {
                      this.preloadingEventBus.signal(
                        new PreloadingDone(route)
                      );
                    }

                    const postActionContext = {
                      ...hookActionContext,
                      actionType: 'post'
                    } as IHookActionContext;

                    if (typeof categoryPostAction === 'function') {
                      categoryPostAction(postActionContext);
                    }

                    if (typeof routePostAction === 'function') {
                      routePostAction(postActionContext);
                    }

                    if (typeof pluginPostAction === 'function') {
                      pluginPostAction(postActionContext);
                    }
                  })
                )
              )
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
          })
        )
      )
    );

      combined.push(streamOfPlugin);
    }

    if (combined.length === 0) {
      combined.push(NEVER);
    }

    const combinedStreams = race(combined) as Observable<any>;
    return this.scheduler.schedule(combinedStreams);
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
    }, [] as string[]);
  }

  private getGuardSignalFor(hook: PreloadingHook): Observable<any> {
    return this.preloadingGuard.hookSignal$.pipe(
      filter(signal => signal === hook),
    );
  }

  private scheduleForIdleTime(): Observable<void> {
    const signal$ = new Subject<void>();
    this.requestIdleCallback(() => signal$.complete());
    return signal$.asObservable();
  }
}
