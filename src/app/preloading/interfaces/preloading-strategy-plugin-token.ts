import { IPreloadingStrategyPlugin } from './preloading-strategy-plugin';
import { IPreloadingConfigBase } from './config-base';
import { InjectionToken } from '@angular/core';


export interface IPreloadingPluginConfig extends IPreloadingConfigBase {
    /**
     * @summary An injection token providing the plugin class to which this config belongs to.
     */
    plugin: InjectionToken<IPreloadingStrategyPlugin>;
    /**
     * @summary The priority of the plugin provided by the token.
     * The plugin with the highest priority will be the first in the plugins queue.
     */
    priority: number;
}

export interface IPreloadingStrategyPluginDefaultConfig extends IPreloadingPluginConfig {
    default: true;
}
