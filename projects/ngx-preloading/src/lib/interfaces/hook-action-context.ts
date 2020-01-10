import { Route } from '@angular/router';
import { IPreloadingStrategyPlugin } from './preloading-strategy-plugin';
import { InjectionToken } from '@angular/core';
import { IRoutePreloadingConfig } from './route-preloading-config';
import { HookActionType } from 'lib/types';

/**
 * @summary Context object containing information about the context in which a hook is called.
 * @description The context object passed to each call of the pre or post action hook's that can be defined in the various configs.
 */
export interface IHookActionContext<T extends any = string> {
    route: Route;
    plugin: IPreloadingStrategyPlugin;
    /**
     * @summary The preloadingCategory which is used in this context.
     */
    category: string | T | InjectionToken<T>;
    effectiveConfig: IRoutePreloadingConfig;
    actionType: HookActionType;
}
