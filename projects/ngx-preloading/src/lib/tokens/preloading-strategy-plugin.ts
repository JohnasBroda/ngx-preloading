import { InjectionToken } from '@angular/core';
import { IPreloadingStrategyPlugin } from '../interfaces';


export const PRELOADING_STRATEGY_PLUGIN =
    new InjectionToken<IPreloadingStrategyPlugin>('Preloading strategy plugin');
