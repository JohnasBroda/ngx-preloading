import { PreloadingHook } from '../enums';
import { IRoutePreloadingConfig } from './route-preloading-config';
import { IPreloadingPluginConfig } from './preloading-strategy-plugin-token';


export interface IPreloadingConfig {
    preloadingHook?: PreloadingHook;
    routeConfigs?: IRoutePreloadingConfig[];
    pluginConfigs?: IPreloadingPluginConfig[];
}
