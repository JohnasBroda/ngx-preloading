import { NgZone } from '@angular/core';
import { Observable, Subscription } from 'rxjs';


/**
 * @summary A custom Rxjs operator that makes the pipeline that
 * it's applied to run it's logic outside of Angular§'s NgZone result in
 * no change detection cycles.
 * @param zone The NgZone instance.
 * @remarks If the passed zone parameter isn't the NgZone instance the operator has no effect!
 */
export function outsideZone<T>(zone: NgZone) {
    return (source: Observable<T>) => {
        if (!zone || zone instanceof NgZone === false) {
            return source;
        }

        return new Observable<T>(observer => {
            let sub: Subscription;

            zone.runOutsideAngular(() => {
                sub = source.subscribe(observer);
            });

            return sub;
        });
    };
}
