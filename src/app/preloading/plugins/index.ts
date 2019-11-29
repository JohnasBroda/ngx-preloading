import { PRELOADING_STRATEGY_PLUGIN } from '../tokens';
import { EagerPreloadingStrategyPlugin } from './eager-preloading-strategy.service';
import { ConditionalPreloadingStrategyPlugin } from './conditional-preloading-strategy.service';
import { OnDemandPreloadingStrategyPlugin } from './on-demand-preloading-strategy.service';
import { NetworkAwarePreloadingStrategyPlugin } from './network-aware-preloading-strategy.service';
import { Provider } from '@angular/core';


export { ConditionalPreloadingStrategyPlugin } from './conditional-preloading-strategy.service';
export { OnDemandPreloadingStrategyPlugin } from './on-demand-preloading-strategy.service';
export { NetworkAwarePreloadingStrategyPlugin } from './network-aware-preloading-strategy.service';
export { EagerPreloadingStrategyPlugin } from './eager-preloading-strategy.service';


export const APP_PRELOADING_STRATEGY_PLUGINS: Provider[] = [
    {
        provide: PRELOADING_STRATEGY_PLUGIN,
        useClass: OnDemandPreloadingStrategyPlugin,
        multi: true,
    },
    {
        provide: PRELOADING_STRATEGY_PLUGIN,
        useClass: NetworkAwarePreloadingStrategyPlugin,
        multi: true,
    },
    {
        provide: PRELOADING_STRATEGY_PLUGIN,
        useClass: ConditionalPreloadingStrategyPlugin,
        multi: true,
    },
    {
        provide: PRELOADING_STRATEGY_PLUGIN,
        useClass: EagerPreloadingStrategyPlugin,
        multi: true,
    },
];
