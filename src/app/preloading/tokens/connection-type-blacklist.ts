import { InjectionToken } from '@angular/core';
import { PreloadingModule } from '../preloading.module';


export const CONNECTION_TYPE_BLACKLIST = new InjectionToken<ConnectionType[]>(
    'Connection type blacklist token', {
    providedIn: PreloadingModule,
    factory: () => (['cellular', 'none']),
});
