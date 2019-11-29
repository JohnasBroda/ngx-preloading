import { Injectable, Inject } from '@angular/core';
import { Route } from '@angular/router';
import { PreloadingGuard } from '../guards';
import { PreloadingStrategyPlugin } from '../utils';
import { PRELOADING_GUARD, PRELOADING_CONFIG, IPreloadingConfig } from '..';


@Injectable({
  providedIn: 'root'
})
export class EagerPreloadingStrategyPlugin extends PreloadingStrategyPlugin {
  public readonly name: string = 'eager strategy';

  constructor(
    @Inject(PRELOADING_GUARD)  public  preloadingGuard: PreloadingGuard,
    @Inject(PRELOADING_CONFIG) public  preloadingConfig: IPreloadingConfig,
  ) {
    super();
  }

  public shouldPreload(route: Route): boolean {
    return route.data && route.data['eagerPreload'] || false;
  }

  public supports(route: Route): boolean {
    return route.data && route.data['eagerPreload'];
  }
}
