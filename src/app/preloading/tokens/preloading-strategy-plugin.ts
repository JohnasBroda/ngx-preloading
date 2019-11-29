import { InjectionToken, inject } from '@angular/core';
import { IPreloadingStrategyPlugin } from '../interfaces';
import { PreloadingModule } from '../preloading.module';
import {
    EagerPreloadingStrategyPlugin,
    ConditionalPreloadingStrategyPlugin,
    NetworkAwarePreloadingStrategyPlugin,
    OnDemandPreloadingStrategyPlugin
} from '../plugins';


export const PRELOADING_STRATEGY_PLUGIN =
    new InjectionToken<IPreloadingStrategyPlugin>('Preloading strategy plugin');

export const EAGER_PRELOADING_PLUGIN = new InjectionToken('Eager preloading plugin', {
    providedIn: PreloadingModule,
    factory: () => {
        return inject(EagerPreloadingStrategyPlugin);
    },
});

export const CONDITIONAL_PRELOADING_PLUGIN = new InjectionToken('Conditional preloading plugin', {
    providedIn: PreloadingModule,
    factory: () => {
        return inject(ConditionalPreloadingStrategyPlugin);
    },
});

export const NETWORK_AWARE_PRELOADING_PLUGIN = new InjectionToken('Network aware preloading plugin', {
    providedIn: PreloadingModule,
    factory: () => {
        return inject(NetworkAwarePreloadingStrategyPlugin);
    },
});

export const ON_DEMAND_PRELOADING_PLUGIN = new InjectionToken('On demand preloading plugin', {
    providedIn: PreloadingModule,
    factory: () => {
        return inject(OnDemandPreloadingStrategyPlugin);
    },
});
