import { Injectable, Injector } from '@angular/core';
import { Route } from '@angular/router';
import { Observable } from 'rxjs';
import { PreloadingError, PreloadingStrategyPlugin } from '../utils';
import { IRoutePreloadingConfig } from '../interfaces';
import { ConfigManagerService } from 'lib/services';


@Injectable()
export class ConditionalPreloadingStrategyPlugin extends PreloadingStrategyPlugin {

  public readonly referralPhrase: string = 'conditionalPreload';

  public readonly name: string = 'Conditional strategy';

  constructor(
    public configs: ConfigManagerService,
    public injector: Injector,
  ) {
    super();
  }

  public shouldPreload(route: Route, config: IRoutePreloadingConfig): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.supports(route, config)) {
      return false;
    }

    const { conditionFn, conditionFnDeps } = config;
    if (!conditionFn) {
      throw new PreloadingError(`No conditionFn specified.`);
    }

    if (typeof conditionFn !== 'function') {
      throw new PreloadingError(`ConditionFn must be a function. Expected function, received: ${typeof conditionFn}`);
    }

    const deps = conditionFnDeps || [];
    if (!Array.isArray(deps)) {
      throw new PreloadingError(`If specified, conditionFnDeps should be an array.`);
    }

    const resolvedDeps = deps.map(dep => {
      try {
        return this.injector.get(dep);
      } catch (error) {
        throw new PreloadingError(`Couldn't resolve dependency: ${dep} for route: ${route.path}`);
      }
    });

    return conditionFn(...resolvedDeps);
  }
}
