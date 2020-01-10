import { NETWORK_AWARE_PRELOADING_PLUGIN } from './network-aware-plugin.token';
import { Provider } from '@angular/core';
import { EAGER_PRELOADING_PLUGIN } from './eager-plugin.token';
import {
    EagerPreloadingStrategyPlugin,
    ConditionalPreloadingStrategyPlugin,
    NetworkAwarePreloadingStrategyPlugin,
    OnDemandPreloadingStrategyPlugin
} from 'lib/plugins';
import { CONDITIONAL_PRELOADING_PLUGIN } from './conditional-plugin.token';
import { ON_DEMAND_PRELOADING_PLUGIN } from './on-demand-plugin.token';


export { ON_DEMAND_PRELOADING_PLUGIN } from './on-demand-plugin.token';
export { CONDITIONAL_PRELOADING_PLUGIN } from './conditional-plugin.token';
export { NETWORK_AWARE_PRELOADING_CHECK } from './network-aware-preloading-check';
export { EAGER_PRELOADING_PLUGIN } from './eager-plugin.token';
export { PRELOADING_STRATEGY_PLUGIN } from './preloading-strategy-plugin';
export { PRELOADING_GUARD } from './preloading-guard';
export { PRELOADING_STRATEGY_PLUGIN_CONFIG } from './preloading-strategy-plugin-config';
export { DEFAULT_PRELOADING_CONFIG } from './default-preloading-config';
export { PRELOADING_CONFIG } from './preloading-config';
export { WINDOW } from './window-ref';
export { NAVIGATOR } from './navigator-ref';
export { CONNECTION_TYPE_BLACKLIST } from './connection-type-blacklist';
export { EFFECTIVE_CONNECTION_TYPE_BLACKLIST } from './effective-connection-type-blacklist';
export { ROUTE_PRELOADING_CONFIG } from './route-preloading-config';
export { PRELOADING_CATEGORY_CONFIG } from './preloading-category-config';


export const PRELOADING_STRATEGY_PLUGIN_ALIASES: Provider[] = [
    {
        provide: EAGER_PRELOADING_PLUGIN,
        useExisting: EagerPreloadingStrategyPlugin,
    },
    {
        provide: CONDITIONAL_PRELOADING_PLUGIN,
        useExisting: ConditionalPreloadingStrategyPlugin,
    },
    {
        provide: NETWORK_AWARE_PRELOADING_PLUGIN,
        useExisting: NetworkAwarePreloadingStrategyPlugin,
    },
    {
        provide: ON_DEMAND_PRELOADING_PLUGIN,
        useExisting: OnDemandPreloadingStrategyPlugin,
    }
];
