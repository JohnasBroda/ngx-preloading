import { Provider, InjectionToken } from '@angular/core';
import { IPreloadingConfigBase } from './config-base';
import { BlacklistHandlingStrategy, PreloadingCategory } from '../types';
import { Observable } from 'rxjs';
import { IPreloadingStrategyPlugin } from './preloading-strategy-plugin';


/**
 * @summary A config object describing the rules that will be used to preload a specific route.
 */
export interface IRoutePreloadingConfig<
    T extends any = string,
    U extends any = string
> extends IPreloadingConfigBase {
    /**
     * @summary The name of the route which this config applies to.
     * @remarks You can introduce a type or an enum that
     *  contains the available routes in your application to achieve type safety.
     */
    route: T;
    /**
     * @summary The preloading category which this route is associated with.
     */
    category?: PreloadingCategory<U>;
    /**
     * @summary If specified determines which plugin will be chosen to preload this route.
     */
    pluginToUse?: InjectionToken<IPreloadingStrategyPlugin>;
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
