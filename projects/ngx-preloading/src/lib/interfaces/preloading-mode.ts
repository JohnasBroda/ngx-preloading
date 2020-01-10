import { Observable } from 'rxjs';

export interface IPreloadingMode {
    /**
     * @summary The rxjs Observable factory function used to schedule the supplied preloading streams.
     */
    streamScheduler: (streams: Observable<any>[]) => Observable<any[]>;
    /**
     * @summary The value to be returned to the streamScheduler when a particular plugin denies to load a route.
     */
    rejectWith: Observable<any>;
}
