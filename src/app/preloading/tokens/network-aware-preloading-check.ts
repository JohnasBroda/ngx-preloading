import { InjectionToken } from '@angular/core';
import { PreloadingCheck } from '../types';

/**
 * @summary Supply a custom preloading check function for the network aware preloading strategy plugin using this injection token.
 */
export const NETWORK_AWARE_PRELOADING_CHECK = new InjectionToken<PreloadingCheck>('Network aware preloading check');
