import { InjectionToken } from '@angular/core';
import { IPreloadingCategoryConfig } from 'lib/interfaces';

/**
 * @summary Provide this token to specify a preloading category.
 * Preloading categories are used to supply the same configurations for multiple routes.
 */
export const PRELOADING_CATEGORY_CONFIG = new InjectionToken<IPreloadingCategoryConfig>(
    'Preloading category config'
);
