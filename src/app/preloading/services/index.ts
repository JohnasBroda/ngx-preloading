import { OnDemandPreloadingService } from './on-demand-preloading.service';
import { PreloadingEventBusService } from './preloading-event-bus.service';


export { OnDemandPreloadingService } from './on-demand-preloading.service';
export { PreloadingEventBusService } from './preloading-event-bus.service';


export const APP_PRELOADING_SERVICES = [
    OnDemandPreloadingService,
    PreloadingEventBusService,
];
