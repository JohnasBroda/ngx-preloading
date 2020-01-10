import { Injectable, Inject, Injector, InjectionToken, Optional } from '@angular/core';
import {
  IPreloadingConfig,
  IRoutePreloadingConfig,
  IPreloadingStrategyPlugin,
  IPreloadingPluginConfig,
  IPreloadingCategoryConfig,
} from '../interfaces';
import { Route } from '@angular/router';
import { PreloadingCategory } from 'lib/types';
import { PRELOADING_CONFIG } from 'lib/tokens/preloading-config';
import { ROUTE_PRELOADING_CONFIG } from 'lib/tokens/route-preloading-config';
import { PRELOADING_STRATEGY_PLUGIN_CONFIG } from 'lib/tokens/preloading-strategy-plugin-config';
import { PRELOADING_CATEGORY_CONFIG } from 'lib/tokens/preloading-category-config';


@Injectable()
export class ConfigManagerService {

  public get pluginConfigs(): IPreloadingPluginConfig[] {
    return this.getProp(
      this._pluginConfigs,
      this.pluginConfigurations
    );
  }

  public get categoryConfigs(): IPreloadingCategoryConfig[] {
    return this.getProp(
      this._categoryConfigs,
      this.categoryConfigurations
    );
  }

  public get routeConfigs(): IRoutePreloadingConfig[] {
    return this.getProp(
      this._routeConfigs,
      this.routeConfigurations,
    );
  }

  private _categoryConfigs: IPreloadingCategoryConfig[];
  private _pluginConfigs: IPreloadingPluginConfig[];
  private _routeConfigs: IRoutePreloadingConfig[];

  constructor(
    @Optional() @Inject(PRELOADING_CATEGORY_CONFIG)
    private readonly categoryConfigurations: IPreloadingCategoryConfig | IPreloadingCategoryConfig[],
    @Optional() @Inject(PRELOADING_STRATEGY_PLUGIN_CONFIG)
    private readonly pluginConfigurations: IPreloadingPluginConfig | IPreloadingPluginConfig[],
    @Optional() @Inject(ROUTE_PRELOADING_CONFIG)
    private readonly routeConfigurations: IRoutePreloadingConfig | IRoutePreloadingConfig[],
    @Inject(PRELOADING_CONFIG)
    private readonly preloadingConfig: IPreloadingConfig,
    private readonly injector: Injector,
  ) {}

  /**
   * @summary Get a merged IRoutePreloadingConfig config object
   * for a particular combination of route, plugin and category.
   * @remarks Use this method to obtain the config that determines the actual behavior
   * for loading a particular route.
   * @param route The route to get the config for.
   * @param plugin The plugin to get the config for.
   * @param category The category to get the config for.
   */
  public getEffectiveConfig<T extends any = string>(
    route: Route,
    plugin?: IPreloadingStrategyPlugin,
    category?: PreloadingCategory<T>,
  ): IRoutePreloadingConfig {
    const defaultConfig = this.preloadingConfig;
    const categoryConfig = this.getCategoryConfig(category);
    const pluginConfig = this.getPluginConfig(plugin);
    const routeConfig = this.getRouteConfig(route);

    return {
      ...defaultConfig,
      ...categoryConfig,
      ...pluginConfig,
      ...routeConfig,
    };
  }

  public getPluginConfig(
    plugin: IPreloadingStrategyPlugin
  ): IPreloadingPluginConfig {
    if (!plugin) {
      return {} as IPreloadingPluginConfig;
    }

    return ((this.pluginConfigs as IPreloadingPluginConfig[]).find(config => {
      if (!config || !config.plugin) {
        return false;
      }

      const configsPlugin = this.injector.get(config.plugin);

      if (!!configsPlugin === false) {
          return false;
      }

      return  !!config
          &&  !!config.plugin
          &&  configsPlugin.name === plugin.name
          ||  false;
    }) || {}) as IPreloadingPluginConfig;
  }

  public getRouteConfig(
    route: Route
  ): IRoutePreloadingConfig {
    if (!route) {
      return {} as IRoutePreloadingConfig;
    }

    const { data, path } = route;
    const ownConfig = this.routeConfigs.find(config => config.route === route.path);
    const inlineConfig = !!data && data['preloading'] || null;

    return {
      route: path,
      ...(!!ownConfig ? ownConfig : {}),
      ...(!!inlineConfig ? inlineConfig : {}),
    };
  }

  public getCategoryConfig(
    category: PreloadingCategory<any>
  ): IPreloadingCategoryConfig<any> {
    if (!category) {
      return {} as IPreloadingCategoryConfig<any>;
    }

    const categoryName = category instanceof InjectionToken
      ? this.injector.get(category)
      : category;

    return (this.categoryConfigs.find(config => {
      if (!config || !config.category) {
        return false;
      }

      const { category: configCategory } = config;
      const configCategoryName = configCategory instanceof InjectionToken
        ? this.injector.get(configCategory)
        : configCategory;

      return configCategoryName === categoryName;
    }) || {}) as IPreloadingCategoryConfig<any>;
  }

  private getProp<T extends any>(
    storingProp: T[],
    injectedProp: any,
  ): T[] {
    if (!!storingProp) {
      return storingProp;
    }

    storingProp = Array.isArray(injectedProp)
      ? injectedProp
      : [ injectedProp ];

    return storingProp;
  }
}
