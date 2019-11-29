import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { PreloadingHook } from '../enums';


@Injectable({
    providedIn: 'root'
})
export class PreloadingGuard {

    public readonly hookSignal$: Observable<PreloadingHook>;

    private readonly _signal$ = new ReplaySubject<PreloadingHook>(1);

    constructor() {
        this.hookSignal$ = this._signal$.asObservable();
    }

    public signal(target: PreloadingHook ): void {
        this._signal$.next(target);
    }
}
