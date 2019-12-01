import { InjectionToken } from '@angular/core';
import { PreloadingModule } from '../preloading.module';


export const EFFECTIVE_CONNECTION_TYPE_BLACKLIST = new InjectionToken<EffectiveConnectionType[]>(
    'Effective vonnection type blacklist token', {
    providedIn: PreloadingModule,
    factory: () => (['2g', 'slow-2g']),
});
