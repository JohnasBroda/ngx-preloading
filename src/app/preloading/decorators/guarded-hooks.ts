import { Injector } from '@angular/core';
import { PRELOADING_GUARD } from '../tokens';
import { PreloadingHook } from '../enums';


type ClassWithInjector = Function & { injector: Injector };


export function GuardedHooks(): (target: ClassWithInjector) => void  {
    return (constructor: ClassWithInjector) => {
        return new Proxy(constructor, {
            construct: (target, args) => {
                const instance = Reflect.construct(target, args) as ClassWithInjector;
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
                        get: () => {
                            if (!!originalHook) {
                                originalHook.get.call(instance);
                            }

                            preloadingGuard.signal(hook);
                        },
                    });
                }

                return instance;
            },
        });
    };
}
