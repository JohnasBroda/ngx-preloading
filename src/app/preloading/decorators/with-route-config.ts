import { PreloadingStrategyPlugin } from '../utils';
import { Route } from '@angular/router';
import { PRELOADING_CONFIG } from '../tokens';


export function WithRouteConfig(): MethodDecorator {
    return (
        target: PreloadingStrategyPlugin,
        propertyKey: 'supports' | 'shouldPreload',
        descriptor: TypedPropertyDescriptor<any>
    ) => {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        }

        const originalMethod = descriptor.value as Function;

        descriptor.value = (route: Route) => {
            const injector = target.injector;
            const preloadingConfig = injector.get(PRELOADING_CONFIG);
            const { routeConfigs } = preloadingConfig;
            const ownConfig = routeConfigs.find(config => config.route === route.path) || {};
            const inlineConfig = !!route && !!route.data && route.data['preloading'] || {};

            const combinedConfig = {
                ...ownConfig,
                ...inlineConfig,
            };

            return originalMethod.call(target, route, combinedConfig);
        };

        return descriptor;
    };
}
