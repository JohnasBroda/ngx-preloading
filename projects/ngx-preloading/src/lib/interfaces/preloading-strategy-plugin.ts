import { Observable } from 'rxjs';
import { Route } from '@angular/router';
import { IRoutePreloadingConfig } from './route-preloading-config';

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
     * @summary Name used only for debugging.
     */
    readonly name: string;
    /**
     * @summary Determines whether or not a route should be preloaded by this plugin.
     * @param route The route object that should be preloaded.
     */
    shouldPreload(route: Route, routeConfig?: IRoutePreloadingConfig): boolean | Promise<boolean> | Observable<boolean>;
    /**
     * @summary Determines whether or not this plugin recognizes a route.
     * @param route The route object that should be preloaded.
     */
    supports(route: Route, routeConfig?: IRoutePreloadingConfig): boolean;
}
