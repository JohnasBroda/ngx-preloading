import { Observable, isObservable } from 'rxjs';
import { switchMap, mapTo, filter } from 'rxjs/operators';
import { isFunction } from '@datorama/akita';


/**
 * @summary Pauses the source observable until the signal observable emits.
 * @param signal The signal observable to wait for.
 */
export function waitFor<T>(
    signalOrPredicate: ((value: T) => Observable<boolean>) | Observable<any>
) {
    if (isObservable(signalOrPredicate)) {
        return (source$: Observable<T>) => source$.pipe(
            switchMap(source => signalOrPredicate.pipe(
                mapTo(source),
            )),
        );
    }

    if (isFunction(signalOrPredicate)) {
        return (source$: Observable<T>) => source$.pipe(
            switchMap(source => (signalOrPredicate(source) as Observable<boolean>).pipe(
                filter(val => !!val),
                mapTo(source),
            )),
        );
    }

    throw new TypeError(`
        Expected ${signalOrPredicate} to be a function or an Observable,
        got: ${typeof signalOrPredicate}
    `);
}
