import { Injectable, Injector, Inject } from '@angular/core';
import { Route } from '@angular/router';
import { Observable } from 'rxjs';
import { PreloadingError, PreloadingStrategyPlugin } from '../utils';
import { PRELOADING_GUARD, PRELOADING_CONFIG } from '../tokens';
import { IPreloadingConfig } from '../interfaces';
import { PreloadingGuard } from '../guards';


@Injectable({
  providedIn: 'root'
})
export class ConditionalPreloadingStrategyPlugin extends PreloadingStrategyPlugin {

  public readonly name: string = 'conditional strategy';

  constructor(
    private injector: Injector,
    @Inject(PRELOADING_GUARD)  public  preloadingGuard: PreloadingGuard,
    @Inject(PRELOADING_CONFIG) public  preloadingConfig: IPreloadingConfig,
  ) {
    super();
  }

  public supports(route: Route): boolean {
    return route.data && route.data['conditionalPreloading'];
  }

  public shouldPreload(route: Route): boolean | Promise<boolean> | Observable<boolean> {
    if (!route.data || !route.data.conditionalPreloading) {
      return false;
    }

    const data = route.data;
    const conditionFn: Function = data.conditionFn;
    if (!conditionFn) {
      throw new PreloadingError(`No conditionFn specified.`);
    }

    if (typeof conditionFn !== 'function') {
      throw new PreloadingError(`ConditionFn must be a function. Expected function, received: ${typeof conditionFn}`);
    }

    const deps = data.conditionFnDeps || [];
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
