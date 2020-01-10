import { Injectable, Inject, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Route } from '@angular/router';
import { map, mapTo } from 'rxjs/operators';
import { OnDemandPreloadingOptions, PreloadingStrategyPlugin } from '../utils';
import { OnDemandPreloadingService, ConfigManagerService } from '../services';
import { PreloadingGuard } from '../guards/preloading.guard';
import { PRELOADING_GUARD } from 'lib/tokens/preloading-guard';
import { waitFor } from '../functions';


@Injectable()
export class OnDemandPreloadingStrategyPlugin extends PreloadingStrategyPlugin {

  public readonly referralPhrase: string = 'onDemandPreload';

  public readonly name: string = 'On Demand strategy';

  private preloadOnDemand$: Observable<OnDemandPreloadingOptions>;

  constructor(
    @Inject(PRELOADING_GUARD)
    public preloadingGuard: PreloadingGuard,
    public configs: ConfigManagerService,
    public injector: Injector,
    private onDemandPreloader: OnDemandPreloadingService,
  ) {
    super();
    this.preloadOnDemand$ = this.onDemandPreloader.preload$;
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

  private preloadCheck(
    route: Route,
    preloadOptions: OnDemandPreloadingOptions
  ): boolean {
    return route.data
        && route.data['preload']
        && [route.path, '*'].includes(preloadOptions.routePath);
  }
}
