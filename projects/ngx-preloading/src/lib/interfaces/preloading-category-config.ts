import { IPreloadingConfigBase } from './config-base';
import { PreloadingCategory } from 'lib/types';
import { InjectionToken } from '@angular/core';
import { IPreloadingStrategyPlugin } from './preloading-strategy-plugin';


export interface IPreloadingCategoryConfig<T extends any = string> extends IPreloadingConfigBase {
    /**
     * @summary The preloadingCategory which this config should be applied to.
     */
    category: PreloadingCategory<T>;
    /**
     * @summary If specified determines which plugin will be chosen to preload routes scoped to this category.
     */
    pluginToUse?: InjectionToken<IPreloadingStrategyPlugin>;
}
