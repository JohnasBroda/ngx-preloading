import { Observable } from 'rxjs';
import { Route } from '@angular/router';
import { PreloadingGuard } from '../guards/preloading.guard';

/**
 * @summary This interface should be implemented by every PreloadingPlugin.
 * @example
 *  export class CustomPreloadingPlugin extends PreloadingStrategyPlugin {
 *     ...
 *      constructor(
 *          Inject(PRELOADING_GUARD) private guard: PreloadingGuard,
 *      ) {
 *          super(guard);
 *      }
 *     ...
 * }
 */
export interface IPreloadingStrategyPlugin {
    /**
     * @summary The preloading guard used by the plugin's base class.
     */
    readonly preloadingGuard: PreloadingGuard;
    /**
     * @summary Name used only for debugging.
     */
    readonly name: string;
    /**
     * @summary Determines whether or not a route should be preloaded by this plugin.
     * @param route The route object that should be preloaded.
     */
    shouldPreload(route: Route): boolean | Promise<boolean> | Observable<boolean>;
    /**
     * @summary Determines whether or not this plugin recognizes a route.
     * @param route The route object that should be preloaded.
     */
    supports(route: Route): boolean;
}
