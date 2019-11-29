import { APP_PRELOADING_GUARDS } from './guards/index';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { APP_PRELOADING_STRATEGIES } from './strategies';
import { APP_PRELOADING_SERVICES } from './services';
import { APP_PRELOADING_STRATEGY_PLUGINS } from './plugins';
import { IPreloadingConfig } from './interfaces/preloading-config';
import { DEFAULT_PRELOADING_CONFIG, PRELOADING_CONFIG } from './tokens';
import { mergeConfigs } from './functions';


@NgModule()
export class PreloadingModule {
    public static forRoot(
        config: IPreloadingConfig
    ): ModuleWithProviders<PreloadingModule> {
        return {
            ngModule: PreloadingModule,
            providers: [
                ...APP_PRELOADING_STRATEGIES,
                ...APP_PRELOADING_STRATEGY_PLUGINS,
                ...APP_PRELOADING_SERVICES,
                ...APP_PRELOADING_GUARDS,
                {
                    provide: PRELOADING_CONFIG,
                    useFactory: (defaultConfig: IPreloadingConfig) => mergeConfigs(
                        defaultConfig,
                        config
                    ),
                    deps: [DEFAULT_PRELOADING_CONFIG],
                },
            ],
        };
    }
}
