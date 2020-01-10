import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { PreloadingHook } from '../enums';


@Injectable({
    providedIn: 'root'
})
export class PreloadingGuard {

    public readonly hookSignal$: Observable<PreloadingHook>;

    private readonly _signal$ = new ReplaySubject<PreloadingHook>(
        Object.keys(PreloadingHook).length
    );

    private readonly _signals = new Set<PreloadingHook>();

    constructor() {
        this.hookSignal$ = this._signal$.asObservable();
    }

    public signal(hook: PreloadingHook): void {
        if (this._signals.has(hook)) {
            return;
        }

        this._signals.add(hook);
        this._signal$.next(hook);
    }
}
