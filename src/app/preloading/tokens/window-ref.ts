import { InjectionToken, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


/**
 * @description An InjectionToken used to safely access window and workerGlobalScope in browser and worker contexts respectively.
 * @throws TypeError: If used in the context of platformServer.
 */
export const WINDOW = new InjectionToken<Window>('Window global scope token', {
    providedIn: 'root',
    factory: () => {
        const platformId = inject(PLATFORM_ID);

        if (isPlatformBrowser(platformId)) {
            return self as Window;
        } else {
            throw new TypeError(`
                platform: ${platformId} doesn't have a window like global scope!
            `);
        }
    },
});
