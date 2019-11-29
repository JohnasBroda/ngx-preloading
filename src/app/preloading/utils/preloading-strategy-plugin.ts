import { IPreloadingStrategyPlugin, IPreloadingPluginConfig, IPreloadingConfig } from '../interfaces';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { switchMapTo, filter, first } from 'rxjs/operators';
import { observify } from 'src/app/shared/functions';
import { PreloadingGuard } from '../guards/preloading.guard';
import { PreloadingHook } from '../enums';


export abstract class PreloadingStrategyPlugin implements IPreloadingStrategyPlugin {

    public abstract readonly name: string;
    public abstract readonly preloadingGuard: PreloadingGuard;
    public abstract readonly preloadingConfig: IPreloadingConfig;


    protected get pluginConfigs(): IPreloadingPluginConfig[] {
        return this.preloadingConfig.pluginConfigs;
    }

    protected get config(): IPreloadingPluginConfig {
        if (!!this._config) {
            return this._config;
        }

        this._config = this.pluginConfigs.find(
            config => !!config && config.plugin.name === this.name
        );

        return this._config;
    }

    protected get preloadingHook(): PreloadingHook {
        return this.config.preloadingHook;
    }

    private _config: IPreloadingPluginConfig;

    constructor(
        configureGuard: boolean = true
    ) {
        if (configureGuard) {
            this.configureGuard();
        }
    }

    public abstract shouldPreload(route: Route): boolean | Observable<boolean> | Promise<boolean>;

    public abstract supports(route: Route): boolean;

    private configureGuard(): void {
        const original = this.shouldPreload;
        this.shouldPreload = (route) => {
            return this.preloadingGuard.hookSignal$.pipe(
                first(),
                filter(hook => hook === this.preloadingHook),
                switchMapTo(observify(original.call(this, route))),
            );
        };
    }
}
