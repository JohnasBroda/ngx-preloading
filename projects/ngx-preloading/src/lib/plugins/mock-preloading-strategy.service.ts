import { ConfigManagerService } from '../services';
import { Injectable, Injector } from '@angular/core';
import { Route } from '@angular/router';
import { PreloadingStrategyPlugin } from '../utils';


@Injectable()
export class MockPreloadingStrategyService extends PreloadingStrategyPlugin {

  public readonly referralPhrase: string = 'mockPreload';

  name = 'Mock strategy';

  constructor(
    public configs: ConfigManagerService,
    public injector: Injector,
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
