import { Injectable } from '@angular/core';
import { Queue } from 'ts-ds-tool';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { filter, tap, map, finalize } from 'rxjs/operators';
import * as uuid from 'uuid/v4';


interface IdentifiedStream {
  id: string;
  stream: Observable<any>;
}

@Injectable({
  providedIn: 'root'
})
export class PreloadingSchedulerService {

  private readonly streams = new Queue<IdentifiedStream>();

  private readonly scheduler$ = new Subject<IdentifiedStream>();

  private readonly signal$ = new Subject<string>();

  private readonly loading$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.signal$.pipe(
      tap(id => {
        if (this.streams.isEmpty()) {
          return;
        }

        const current = this.streams.peek();
        const isSignalForCurrent = !!current && current.id === id;

        const isLoading = this.loading$.value;

        if (isSignalForCurrent && !isLoading) {
          this.scheduler$.next(current);
        }
      }),
    );

    this.scheduler$.asObservable().pipe(
      tap(() => this.loading$.next(true))
    );

    this.loading$.pipe(
      filter(loading => !loading),
      tap(() => {
        const current = this.streams.dequeue();
        this.scheduler$.next(current);
      }),
    );
  }

  public schedule(stream: Observable<any>): Observable<any> {
    const id = uuid();
    this.streams.enqueue({ id, stream });
    this.signal$.next(id);

    return this.getScheduled(id);
  }


  private getScheduled(id: string): Observable<any> {
    return this.scheduler$.asObservable().pipe(
      filter(stream => stream.id === id),
      map(({ stream }) => stream),
      finalize(() => this.loading$.next(false)),
    );
  }
}
