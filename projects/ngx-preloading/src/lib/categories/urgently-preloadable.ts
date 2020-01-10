import { IPreloadingCategoryConfig } from 'lib/interfaces';
import { InjectionToken } from '@angular/core';
import { PreloadingProvidersModule } from 'lib/preloading-providers.module';


export const URGENTLY_PRELOADABLE = new InjectionToken<IPreloadingCategoryConfig>(
    'urgently preloadable category',
    {
        providedIn: PreloadingProvidersModule,
        factory: () => null,
    }
);
