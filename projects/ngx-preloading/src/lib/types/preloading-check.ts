import { Observable } from 'rxjs';
import { Route } from '@angular/router';
import { IRoutePreloadingConfig } from '../interfaces';

/**
 * @summary The type of the method used by the various preloading plugins to determine whether to preload a specific route or not.
 */
export type PreloadingCheck = (
    route?: Route,
    routeConfig?: IRoutePreloadingConfig
) => boolean | Promise<boolean> | Observable<boolean>;
