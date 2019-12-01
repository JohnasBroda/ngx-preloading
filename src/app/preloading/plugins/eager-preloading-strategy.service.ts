import { Injectable, Inject, Injector } from '@angular/core';
import { Route } from '@angular/router';
import { PreloadingGuard } from '../guards';
import { PreloadingStrategyPlugin } from '../utils';
import { PRELOADING_GUARD, PRELOADING_CONFIG, IPreloadingConfig, IRoutePreloadingConfig } from '..';
import { WithRouteConfig } from '../decorators';


@Injectable()
export class EagerPreloadingStrategyPlugin extends PreloadingStrategyPlugin {
  public readonly name: string = 'Eager strategy';

  constructor(
    public injector: Injector,
    @Inject(PRELOADING_GUARD)  public  preloadingGuard: PreloadingGuard,
    @Inject(PRELOADING_CONFIG) public  preloadingConfig: IPreloadingConfig,
  ) {
    super();
  }

  @WithRouteConfig()
  public shouldPreload(route: Route, config: IRoutePreloadingConfig): boolean {
    return this.supports(route, config);
  }

  @WithRouteConfig()
  public supports(_route: Route, config: IRoutePreloadingConfig): boolean {
    return !!config && !!config['eagerPreload'] || false;
  }
}
