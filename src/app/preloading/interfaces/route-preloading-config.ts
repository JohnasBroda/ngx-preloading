import { NetworkAwarePreloadingStrategyPlugin } from './../plugins/network-aware-preloading-strategy.service';
import { Provider } from '@angular/core';
import { IPreloadingConfigBase } from './config-base';
import { BlacklistHandlingStrategy } from '../types';
import { Observable } from 'rxjs';


export interface IRoutePreloadingConfig<T extends any = string>
    extends IPreloadingConfigBase {
    /**
     * @summary The name of the route which this config applies to.
     * @remarks You can introduce a type or an enum that
     *  contains the available routes in your application to achieve type safety.
     */
    route: T;
    /**
     * @summary The ConnectionType blacklist to be used by the NetworkAwarePreloadingStrategyPlugin
     * when preloading this route.
     */
    connectionTypeBlacklist?: ConnectionType[];
    /**
     * @summary Specifies how the custom ConnectionType blacklist and the default one should be used together.
     */
    effectiveConnectionTypeBlacklist: EffectiveConnectionType[];
    /**
     * @summary The EffectiveConnectionType blacklist to be used by the NetworkAwarePreloadingStrategyPlugin
     * when preloading this route.
     */
    effectiveConnectionTypeBlacklistHandlingStrategy?: BlacklistHandlingStrategy;
    /**
     * @summary Specifies how the custom EffectiveConnectionType blacklist and the default one should be used together.
     */
    connectionTypeBlacklistHandlingStrategy: BlacklistHandlingStrategy;
    /**
     * @summary If defined this function determines if this route should be preloaded by the ConditionalPreloadingStrategyPlugin.
     */
    conditionFn?: (...args: any[]) => boolean | Promise<boolean> | Observable<boolean>;
    /**
     * @summary Define an array of Providers that will be resolved as arguments for the conditionFn for this route.
     */
    conditionFnDeps?: Provider[];
    [key: string]: any;
}
