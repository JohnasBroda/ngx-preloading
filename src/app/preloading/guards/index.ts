import { Provider } from '@angular/core';
import { PRELOADING_GUARD } from '../tokens';
import { PreloadingGuard } from './preloading.guard';


export * from './preloading.guard';


export const APP_PRELOADING_GUARDS: Provider[] = [
    PreloadingGuard,
    {
        provide: PRELOADING_GUARD,
        useExisting: PreloadingGuard
    },
];
