import { PreloadingHook } from '../enums';
import { IHookActionContext } from './hook-action-context';

/**
 * @summary The base interface containing the fields shared by all other configs.
 */
export interface IPreloadingConfigBase {
    /**
     * @summary The preloading hook at which this plugin should be preloaded at.
     */
    preloadingHook?: PreloadingHook;
    /**
     * @summary A function to be called before the plugin starts preloading a route.
     */
    preAction?: (context: IHookActionContext) => void;
    /**
     * @summary A function to be called after the plugin preloaded a route.
     */
    postAction?: (context: IHookActionContext) => void;
    /**
     * @summary Whether or not the preloading should be initiated in an idle callback.
     * @remarks Has no effect if the useBackgroundTask is set to true.
     */
    useIdleTime?: boolean;
    /**
     * @summary Whether or not to make the preloading trigger Angular's change detection.
     */
    triggerChangeDetection?: boolean;
}
