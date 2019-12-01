import { Observable } from 'rxjs';
import { Route } from '@angular/router';
import { IRoutePreloadingConfig } from '../interfaces';


export type PreloadingCheck = (
    route?: Route,
    routeConfig?: IRoutePreloadingConfig
) => boolean | Promise<boolean> | Observable<boolean>;
