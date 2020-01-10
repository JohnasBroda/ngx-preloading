import { Injectable, Injector } from '@angular/core';
import { Route } from '@angular/router';
import { PreloadingStrategyPlugin } from '../utils';
import { IRoutePreloadingConfig } from '../interfaces';
import { ConfigManagerService } from 'lib/services/config-manager.service';

@Injectable()
export class EagerPreloadingStrategyPlugin extends PreloadingStrategyPlugin {

  public readonly referralPhrase: string = 'eagerPreload';

  public readonly name: string = 'Eager strategy';

  constructor(
    public configs: ConfigManagerService,
    public injector: Injector,
  ) {
    super();
  }

  public shouldPreload(route: Route, config: IRoutePreloadingConfig): boolean {
    return this.supports(route, config);
  }
}
