import { InjectionToken } from '@angular/core';

/**
 * @summary The type of the available preloading categories.
 * @remarks Use your own union type or enum to safe type your categories.
 */
export type PreloadingCategory<T extends any = string> = T | InjectionToken<T>;
