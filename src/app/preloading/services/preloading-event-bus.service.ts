import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PreloadingEvent } from '../classes';


@Injectable()
export class PreloadingEventBusService {

  public readonly events$: Observable<PreloadingEvent>;

  private _eventStream$ = new Subject<PreloadingEvent>();

  constructor() {
    this.events$ = this._eventStream$.asObservable();
  }

  public signal(event: PreloadingEvent): void {
    this._eventStream$.next(event);
  }
}
