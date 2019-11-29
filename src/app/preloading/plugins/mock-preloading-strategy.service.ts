import { Injectable, Inject } from '@angular/core';
import { IPreloadingConfig } from '../interfaces';
import { PRELOADING_GUARD, PreloadingGuard, PRELOADING_CONFIG } from '..';
import { Route } from '@angular/router';
import { PreloadingStrategyPlugin } from '../utils';


@Injectable({
  providedIn: 'root'
})
export class MockPreloadingStrategyService extends PreloadingStrategyPlugin {
  name = 'mock plugin';

  constructor(
    @Inject(PRELOADING_GUARD)  public  preloadingGuard: PreloadingGuard,
    @Inject(PRELOADING_CONFIG) public  preloadingConfig: IPreloadingConfig,
  ) {
    super();
  }

  shouldPreload(route: Route): boolean {
    return true;
  }

  supports(route: Route): boolean {
    return true;
  }
}
