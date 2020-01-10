import { PreloadingEvent } from './preloading-event';
import { Route } from '@angular/router';


export class PreloadingDone extends PreloadingEvent {

    public readonly messages = 'Preloading done';

    constructor(public readonly route: Route) {
        super();
    }
}
