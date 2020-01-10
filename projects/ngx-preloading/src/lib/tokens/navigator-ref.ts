import { WINDOW } from './window-ref';
import { InjectionToken, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, isPlatformWorkerApp, isPlatformWorkerUi } from '@angular/common';

export const NAVIGATOR = new InjectionToken<Navigator>('NavigatorToken', {
    factory: () => {
        const platformId = inject(PLATFORM_ID) as string;
        const window = inject(WINDOW);

        if (isPlatformBrowser(platformId)) {
            return window.navigator;
        }

        throw new TypeError(`
            Platform: ${platformId} doesn't have a navigator like interface available!
        `);

    }
});
