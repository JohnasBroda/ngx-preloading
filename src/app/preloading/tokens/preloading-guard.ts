import { InjectionToken } from '@angular/core';
import { PreloadingGuard } from '../guards/preloading.guard';


export const PRELOADING_GUARD = new InjectionToken<PreloadingGuard>('Preloading guard token');
