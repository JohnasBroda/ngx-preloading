import { InjectionToken } from '@angular/core';
import { IPreloadingConfig } from '../interfaces/preloading-config';
import { PreloadingModule } from '../preloading.module';
import { PreloadingHook } from '../enums';
import {
    ON_DEMAND_PRELOADING_PLUGIN,
    NETWORK_AWARE_PRELOADING_PLUGIN,
    CONDITIONAL_PRELOADING_PLUGIN,
    EAGER_PRELOADING_PLUGIN
} from './preloading-strategy-plugin';


export const DEFAULT_PRELOADING_CONFIG = new InjectionToken<IPreloadingConfig>(
    'Default preloading config', {
    providedIn: PreloadingModule,
    factory: () => ({
        preloadingHook: PreloadingHook.AfterViewInit,
        pluginConfigs: [
            {
                plugin: ON_DEMAND_PRELOADING_PLUGIN,
                priority: 3,
            },
            {
                plugin: NETWORK_AWARE_PRELOADING_PLUGIN,
                priority: 2
            },
            {
                plugin: CONDITIONAL_PRELOADING_PLUGIN,
                priority: 1,
            },
            {
                plugin: EAGER_PRELOADING_PLUGIN,
                priority: 0,
            },
        ],
    }),
});
