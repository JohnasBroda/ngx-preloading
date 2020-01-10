import { InjectionToken } from '@angular/core';
import { PreloadingProvidersModule } from 'lib/preloading-providers.module';


export const EFFECTIVE_CONNECTION_TYPE_BLACKLIST = new InjectionToken<EffectiveConnectionType[]>(
    'Effective connection type blacklist token', {
    providedIn: PreloadingProvidersModule,
    factory: () => (['2g', 'slow-2g']),
});
