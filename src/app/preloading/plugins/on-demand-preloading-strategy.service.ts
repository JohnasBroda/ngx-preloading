import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Route } from '@angular/router';
import { map, mapTo } from 'rxjs/operators';
import { OnDemandPreloadingOptions, PreloadingStrategyPlugin } from '../utils';
import { OnDemandPreloadingService } from '../services';
import { PreloadingGuard } from '../guards';
import { waitFor } from 'src/app/shared/functions';
import { PRELOADING_CONFIG, PRELOADING_GUARD } from '../tokens';
import { IPreloadingConfig } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class OnDemandPreloadingStrategyPlugin extends PreloadingStrategyPlugin {

  public readonly name: string = 'on demand strategy';

  private preloadOnDemand$: Observable<OnDemandPreloadingOptions>;

  constructor(
    private onDemand: OnDemandPreloadingService,
    @Inject(PRELOADING_GUARD)  public  preloadingGuard: PreloadingGuard,
    @Inject(PRELOADING_CONFIG) public  preloadingConfig: IPreloadingConfig,
  ) {
    super(false);
    this.preloadOnDemand$ = this.onDemand.preload$;
  }

  public shouldPreload(route: Route): Observable<boolean> {
    return this.preloadOnDemand$.pipe(
      waitFor(({ fromProxy }) => fromProxy
        ? this.preloadingGuard.hookSignal$.pipe(mapTo(true))
        : of(true)
      ),
      map(options => this.preloadCheck(route, options)),
    );
  }

  public supports(route: Route): boolean {
    return route.data && route.data['preload'];
  }

  private preloadCheck(
    route: Route,
    preloadOptions: OnDemandPreloadingOptions
  ): boolean {
    return route.data
        && route.data['preload']
        && [route.path, '*'].includes(preloadOptions.routePath);
  }
}
