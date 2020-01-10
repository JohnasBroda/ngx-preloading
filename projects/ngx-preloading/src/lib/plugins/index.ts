import { PRELOADING_STRATEGY_PLUGIN } from '../tokens/preloading-strategy-plugin';
import { EagerPreloadingStrategyPlugin } from './eager-preloading-strategy.service';
import { ConditionalPreloadingStrategyPlugin } from './conditional-preloading-strategy.service';
import { OnDemandPreloadingStrategyPlugin } from './on-demand-preloading-strategy.service';
import { NetworkAwarePreloadingStrategyPlugin } from './network-aware-preloading-strategy.service';
import { Provider } from '@angular/core';


export { ConditionalPreloadingStrategyPlugin } from './conditional-preloading-strategy.service';
export { OnDemandPreloadingStrategyPlugin } from './on-demand-preloading-strategy.service';
export { NetworkAwarePreloadingStrategyPlugin } from './network-aware-preloading-strategy.service';
export { EagerPreloadingStrategyPlugin } from './eager-preloading-strategy.service';


export const PRELOADING_STRATEGY_PLUGINS: Provider[] = [
    OnDemandPreloadingStrategyPlugin,
    NetworkAwarePreloadingStrategyPlugin,
    ConditionalPreloadingStrategyPlugin,
    EagerPreloadingStrategyPlugin,
    {
        provide: PRELOADING_STRATEGY_PLUGIN,
        useExisting: OnDemandPreloadingStrategyPlugin,
        multi: true,
    },
    {
        provide: PRELOADING_STRATEGY_PLUGIN,
        useExisting: NetworkAwarePreloadingStrategyPlugin,
        multi: true,
    },
    {
        provide: PRELOADING_STRATEGY_PLUGIN,
        useExisting: ConditionalPreloadingStrategyPlugin,
        multi: true,
    },
    {
        provide: PRELOADING_STRATEGY_PLUGIN,
        useExisting: EagerPreloadingStrategyPlugin,
        multi: true,
    },
];
