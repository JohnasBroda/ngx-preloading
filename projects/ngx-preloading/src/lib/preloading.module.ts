import { ModuleWithProviders, NgModule } from '@angular/core';
import { PreloadingGuard } from './guards';
import { PRELOADING_SERVICES } from './services';
import { PRELOADING_STRATEGY_PLUGINS } from './plugins';
import { IPreloadingConfig } from './interfaces';
import { DEFAULT_PRELOADING_CONFIG, PRELOADING_CONFIG, PRELOADING_GUARD, PRELOADING_STRATEGY_PLUGIN_ALIASES } from './tokens';
import { PreloadingProvidersModule } from './preloading-providers.module';
import { PRELOADABLE_CATEGORY_CONFIG_PROVIDERS } from './configs';
import { PluginManagerPreloadingStrategy } from './strategies/plugin-manager-preloading-strategy.service';


@NgModule({
    imports: [
        PreloadingProvidersModule,
    ],
})
export class NgxPreloadingModule {
    public static forRoot(
        config: Partial<IPreloadingConfig> = {}
    ): ModuleWithProviders<NgxPreloadingModule> {
        return {
            ngModule: NgxPreloadingModule,
            providers: [
                PluginManagerPreloadingStrategy,
                ...PRELOADING_STRATEGY_PLUGINS,
                ...PRELOADING_STRATEGY_PLUGIN_ALIASES,
                ...PRELOADING_SERVICES,
                ...PRELOADABLE_CATEGORY_CONFIG_PROVIDERS,
                {
                    provide: PRELOADING_GUARD,
                    useExisting: PreloadingGuard
                },
                {
                    provide: PRELOADING_CONFIG,
                    useFactory: (defaultConfig: IPreloadingConfig) => ({
                        ...defaultConfig,
                        ...config,
                    }),
                    deps: [DEFAULT_PRELOADING_CONFIG],
                },
            ],
        };
    }
}
