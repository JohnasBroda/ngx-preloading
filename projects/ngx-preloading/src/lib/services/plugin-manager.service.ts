import { Injectable, Inject } from '@angular/core';
import { PRELOADING_STRATEGY_PLUGIN } from '../tokens/preloading-strategy-plugin';
import { IPreloadingStrategyPlugin } from '../interfaces';
import { ConfigManagerService } from './config-manager.service';


@Injectable()
export class PluginManagerService {

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

  public get sortedPlugins(): IPreloadingStrategyPlugin[] {
    if (!!this._sortedPlugins) {
      return this._sortedPlugins;
    }

    this._sortedPlugins = this.preloadingPlugins.sort((a, b) => {
      const configOfA = this.configs.getPluginConfig(a);
      const configOfB = this.configs.getPluginConfig(b);

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

  private _sortedPlugins: IPreloadingStrategyPlugin[];
  private _preloadingPlugins: IPreloadingStrategyPlugin[];

  constructor(
    @Inject(PRELOADING_STRATEGY_PLUGIN)
    private plugins: IPreloadingStrategyPlugin | IPreloadingStrategyPlugin[],
    private configs: ConfigManagerService,
  ) { }

}
