import { IPreloadingCategoryConfig } from 'lib/interfaces';
import { Provider } from '@angular/core';
import { PRELOADING_CATEGORY_CONFIG } from 'lib/tokens';
import { PreloadingHook } from 'lib/enums';
import { URGENTLY_PRELOADABLE } from 'lib/categories';
import { EAGER_PRELOADING_PLUGIN } from 'lib/tokens';


export const URGENTLY_PRELOADABLE_CATEGORY: Provider = {
    provide: PRELOADING_CATEGORY_CONFIG,
    useValue: {
        category: URGENTLY_PRELOADABLE,
        preloadingHook: PreloadingHook.OnInit,
        preAction: (context) => console.log('urgently preloading: ', context.route),
        useIdleTime: false,
        pluginToUse: EAGER_PRELOADING_PLUGIN,
    } as IPreloadingCategoryConfig,
    multi: true,
};

