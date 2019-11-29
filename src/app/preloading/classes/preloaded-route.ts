import { PreloadingEvent } from './preloading-event';
import { Route } from '@angular/router';


export class PreloadedRoute extends PreloadingEvent {
    constructor(
        public readonly message: string,
        public readonly route: Route,
    ) {
        super();
    }
}
