import { PreloadingEvent } from './preloading-event';


export class PreloadingFail extends PreloadingEvent {
    constructor(public readonly message: string) {
        super();
    }
}
