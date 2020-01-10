import { InjectionToken } from '@angular/core';
import { PreloadingProvidersModule } from 'lib/preloading-providers.module';


export const CONNECTION_TYPE_BLACKLIST = new InjectionToken<ConnectionType[]>(
    'Connection type blacklist token', {
    providedIn: PreloadingProvidersModule,
    factory: () => (['cellular', 'none']),
});
