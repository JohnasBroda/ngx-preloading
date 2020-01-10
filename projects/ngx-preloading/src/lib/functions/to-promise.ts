import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';


type InferObservable<T> = T extends Observable<infer R> ? R : T;

export function toPromise<T extends Observable<any>>(
    val: T
): Promise<InferObservable<T>> {
    if (val instanceof Observable) {
        return (val as Observable<InferObservable<T>>).pipe(
            first(),
        ).toPromise();
    }
}
