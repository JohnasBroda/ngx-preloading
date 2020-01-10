import { PreloadingEvent } from './preloading-event';
import { Route } from '@angular/compiler/src/core';


export class PreloadingStart extends PreloadingEvent {

    public readonly message = 'Started preloading';

    constructor(public readonly route: Route) {
        super();
    }
}
