import { isPrimitive } from 'util';
import { isPromiseAlike } from 'q';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

type InferObservable<T> =
    T extends Observable<infer R> ? R : T;

export function toPromise<T extends Observable<any>>(
    val: T
): Promise<InferObservable<T>> {
    if (val instanceof Observable) {
        return (val as Observable<InferObservable<T>>).pipe(
            first(),
        ).toPromise();
    }
}
