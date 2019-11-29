import { InjectionToken } from '@angular/core';
import { IPreloadingPluginConfig } from '../interfaces';


export const PRELOADING_STRATEGY_PLUGIN_CONFIG =
    new InjectionToken<IPreloadingPluginConfig>(
        'Preloading plugin config'
    );
