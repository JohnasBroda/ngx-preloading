import { filter, mapTo, switchMap } from 'rxjs/operators';
import { isObservable, Observable } from 'rxjs';



/**
 * @summary Pauses the source observable until the signal observable emits.
 * @param signal The signal observable to wait for.
 */
export function waitFor<T>(
    streamOrPredicate: ((value: T) => Observable<boolean>) | Observable<any>
) {
    if (isObservable(streamOrPredicate)) {
        return (source$: Observable<T>) => source$.pipe(
            switchMap(source => streamOrPredicate.pipe(
                mapTo(source),
            )),
        );
    }

    if (typeof streamOrPredicate === 'function') {
        return (source$: Observable<T>) => source$.pipe(
            switchMap(source => (streamOrPredicate(source) as Observable<boolean>).pipe(
                filter(val => !!val),
                mapTo(source),
            )),
        );
    }

    throw new TypeError(`
        Expected ${streamOrPredicate} to be a function or an Observable,
        got: ${typeof streamOrPredicate}
    `);
}
