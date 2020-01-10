import { OnDemandPreloadingService } from './on-demand-preloading.service';
import { PreloadingEventBusService } from './preloading-event-bus.service';
import { PluginManagerService } from './plugin-manager.service';
import { ConfigManagerService } from './config-manager.service';
import { PreloadingSchedulerService } from './preloading-scheduler.service';


export { OnDemandPreloadingService } from './on-demand-preloading.service';
export { PreloadingEventBusService } from './preloading-event-bus.service';
export { PluginManagerService } from './plugin-manager.service';
export { ConfigManagerService } from './config-manager.service';
export { PreloadingSchedulerService } from './preloading-scheduler.service';


export const PRELOADING_SERVICES = [
    ConfigManagerService,
    OnDemandPreloadingService,
    PreloadingEventBusService,
    PluginManagerService,
    PreloadingSchedulerService,
];
