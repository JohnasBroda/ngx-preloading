import { Injectable, Inject } from '@angular/core';
import { Route } from '@angular/router';
import { PreloadingStrategyPlugin } from '../utils';
import { PRELOADING_GUARD, PRELOADING_CONFIG, NAVIGATOR } from '../tokens';
import { PreloadingGuard } from '../guards';
import { IPreloadingConfig } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class NetworkAwarePreloadingStrategyPlugin extends PreloadingStrategyPlugin {

  public readonly name: string = 'network aware strategy';

  private get connection() {
    return this.navigator && this.navigator['connection']
        || this.navigator['mozConnection']
        || this.navigator['webkitConnection'];
  }

  constructor(
    @Inject(NAVIGATOR)         private navigator: Navigator,
    @Inject(PRELOADING_GUARD)  public  preloadingGuard: PreloadingGuard,
    @Inject(PRELOADING_CONFIG) public  preloadingConfig: IPreloadingConfig,
  ) {
    super();
  }

  public supports(route: Route): boolean {
    return route.data && route.data['preload'];
  }

  public shouldPreload(route: Route): boolean {
    if (!route.data || !route.data['preload']) {
      return false;
    }

    if (!this.connection) {
      return false;
    }

    if (this.connection.saveData) {
      return false;
    }

    const effectiveType = this.connection.effectiveType || '';
    if (effectiveType.includes('2g')) {
      return false;
    }

    return true;
  }
}
