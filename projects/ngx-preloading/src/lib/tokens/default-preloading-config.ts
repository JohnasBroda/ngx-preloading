import { InjectionToken } from '@angular/core';
import { IPreloadingConfig } from '../interfaces/preloading-config';
import { PreloadingHook } from '../enums';
import { PreloadingProvidersModule } from 'lib/preloading-providers.module';
import { NETWORK_AWARE_PRELOADING_PLUGIN } from './network-aware-plugin.token';
import { ON_DEMAND_PRELOADING_PLUGIN } from './on-demand-plugin.token';
import { CONDITIONAL_PRELOADING_PLUGIN } from './conditional-plugin.token';
import { EAGER_PRELOADING_PLUGIN } from './eager-plugin.token';


export const DEFAULT_PRELOADING_CONFIG = new InjectionToken<IPreloadingConfig>(
    'Default preloading config', {
    providedIn: PreloadingProvidersModule,
    factory: () => ({
        useIdleTime: true,
        preloadingHook: PreloadingHook.AfterViewInit,
        triggerChangeDetection: false,
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
