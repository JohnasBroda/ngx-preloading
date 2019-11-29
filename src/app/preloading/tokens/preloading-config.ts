import { InjectionToken } from '@angular/core';
import { IPreloadingConfig } from '../interfaces/preloading-config';

export const PRELOADING_CONFIG = new InjectionToken<IPreloadingConfig>('Preloading config');
