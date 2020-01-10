import { Observable, of, from } from 'rxjs';


export function observify<T>(value: T | Promise<T> | Observable<T>): Observable<T> {
    if (value instanceof Observable) {
        return value;
    }

    if (value instanceof Promise) {
        return from(value);
    }

    return of(value);
}
