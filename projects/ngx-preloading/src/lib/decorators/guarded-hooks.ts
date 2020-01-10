import { PRELOADING_GUARD } from '../tokens/preloading-guard';
import { PreloadingHook } from '../enums';
import { Constructor } from 'lib/interfaces';
import { PreloadingRootComponent } from 'lib/types';

/**
 * @summary Use this decorator on the root component of your application
 * to ensure the proper behavior of the preloading strategy.
 * @remarks The decorator requires the implementation of certain life cycle hooks
 * even if those aren't doing any actual work.
 */
export function GuardedHooks<T extends PreloadingRootComponent, U extends any>() {
    return (constructor: Constructor<T>) => {
        return new Proxy(constructor, {
            construct: (target, args) => {
                const instance = Reflect.construct(target, args);
                const { injector } = instance;
                const preloadingGuard = injector.get(PRELOADING_GUARD);

                const preloadingHooks = Object.values(PreloadingHook);
                for (const hook of preloadingHooks) {
                    if (hook === PreloadingHook.Immediate) {
                        preloadingGuard.signal(hook);
                        continue;
                    }

                    const originalHook = Reflect.getOwnPropertyDescriptor(
                        instance,
                        hook
                    );

                    Reflect.defineProperty(instance, hook, {
                        ...originalHook,
                        value: () => {
                            if (!!originalHook) {
                                originalHook.get.call(instance);
                            }

                            preloadingGuard.signal(hook);
                        },
                    });
                }

                return instance as T & U;
            },
        });
    };
}
