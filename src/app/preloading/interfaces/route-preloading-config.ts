import { IPreloadingConfigBase } from './config-base';


export interface IRoutePreloadingConfig<T extends any = string>
    extends IPreloadingConfigBase {
    /**
     * @summary The name of the route which this config applies to.
     * @remarks You can introduce a type or an enum that
     *  contains the available routes in your application to achieve type safety.
     */
    route: T;
}
