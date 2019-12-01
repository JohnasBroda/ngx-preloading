import { Injectable, Inject, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Route } from '@angular/router';
import { map, mapTo } from 'rxjs/operators';
import { OnDemandPreloadingOptions, PreloadingStrategyPlugin } from '../utils';
import { OnDemandPreloadingService } from '../services';
import { PreloadingGuard } from '../guards';
import { waitFor } from 'src/app/shared/functions';
import { PRELOADING_CONFIG, PRELOADING_GUARD } from '../tokens';
import { IPreloadingConfig, IRoutePreloadingConfig } from '../interfaces';
import { WithRouteConfig } from '../decorators';


@Injectable()
export class OnDemandPreloadingStrategyPlugin extends PreloadingStrategyPlugin {

  public readonly name: string = 'On Demand strategy';

  private preloadOnDemand$: Observable<OnDemandPreloadingOptions>;

  constructor(
    public injector: Injector,
    private onDemandPreloader: OnDemandPreloadingService,
    @Inject(PRELOADING_GUARD)  public  preloadingGuard: PreloadingGuard,
    @Inject(PRELOADING_CONFIG) public  preloadingConfig: IPreloadingConfig,
  ) {
    super(false);
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

  @WithRouteConfig()
  public supports(_route: Route, config: IRoutePreloadingConfig): boolean {
    return !!config && !!config['onDemandPreload'];
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
