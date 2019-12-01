import { Injectable, Injector, Inject } from '@angular/core';
import { Route } from '@angular/router';
import { Observable } from 'rxjs';
import { PreloadingError, PreloadingStrategyPlugin } from '../utils';
import { PRELOADING_GUARD, PRELOADING_CONFIG } from '../tokens';
import { IPreloadingConfig, IRoutePreloadingConfig } from '../interfaces';
import { PreloadingGuard } from '../guards';
import { WithRouteConfig } from '../decorators';


@Injectable()
export class ConditionalPreloadingStrategyPlugin extends PreloadingStrategyPlugin {

  public readonly name: string = 'Conditional strategy';

  constructor(
    public injector: Injector,
    @Inject(PRELOADING_GUARD)  public  preloadingGuard: PreloadingGuard,
    @Inject(PRELOADING_CONFIG) public  preloadingConfig: IPreloadingConfig,
  ) {
    super();
  }

  @WithRouteConfig()
  public supports(_route: Route, config: IRoutePreloadingConfig): boolean {
    return !!config && !!config['conditionalPreload'] || false;
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
