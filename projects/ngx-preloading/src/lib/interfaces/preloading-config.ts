import { IPreloadingConfigBase } from './config-base';


/**
 * @summary the root level preloading config that's applied to all routes, plugins and categories
 * unless overwritten by some other higher level configuration.
 */
export interface IPreloadingConfig extends IPreloadingConfigBase  {}
