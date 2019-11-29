import { PreloadingHook } from '../enums';


export interface IPreloadingConfigBase {
    /**
     * @summary The preloading hook at which this plugin should be preloaded at.
     */
    preloadingHook?: PreloadingHook;
    /**
     * @summary A function to be called before the plugin starts preloading a route.
     */
    preAction?: (...args: any[]) => void;
    /**
     * @summary A function to be called after the plugin preloaded a route.
     */
    postAction?: (...args: any[]) => void;
}
