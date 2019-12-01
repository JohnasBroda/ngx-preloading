import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OnDemandPreloadingOptions } from '../utils';


@Injectable()
export class OnDemandPreloadingService {

  private _notifier = new Subject<OnDemandPreloadingOptions>();
  public readonly preload$ = this._notifier.asObservable();

  public startPreload(routePath: string, fromProxy: boolean = false) {
    const message = new OnDemandPreloadingOptions(
      routePath.toLowerCase(),
      fromProxy
    );
    this._notifier.next(message);
  }
}
