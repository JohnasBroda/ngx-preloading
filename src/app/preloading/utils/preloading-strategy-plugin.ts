import { IPreloadingStrategyPlugin, IPreloadingPluginConfig, IPreloadingConfig, IRoutePreloadingConfig } from '../interfaces';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { switchMapTo, filter, first } from 'rxjs/operators';
import { observify } from 'src/app/shared/functions';
import { PreloadingGuard } from '../guards/preloading.guard';
import { PreloadingHook } from '../enums';
import { Injector } from '@angular/core';


export abstract class PreloadingStrategyPlugin implements IPreloadingStrategyPlugin {

    public abstract readonly name: string;
    public abstract readonly preloadingGuard: PreloadingGuard;
    public abstract readonly preloadingConfig: IPreloadingConfig;
    public abstract readonly injector: Injector;

    protected get pluginConfigs(): IPreloadingPluginConfig[] {
        return this.preloadingConfig && this.preloadingConfig.pluginConfigs || [];
    }

    protected get config(): IPreloadingPluginConfig {
        if (!!this._config) {
            return this._config;
        }

        this._config = this.getOwnConfig();

        return this._config;
    }

    protected get preloadingHook(): PreloadingHook {
        return this.config.preloadingHook;
    }

    private _config: IPreloadingPluginConfig;

    constructor(configure: boolean = true) {
        if (configure) {
            this.configurePreloadingHook();
        }
    }

    public abstract shouldPreload(route?: Route, config?: IRoutePreloadingConfig): boolean | Observable<boolean> | Promise<boolean>;

    public abstract supports(route?: Route, config?: IRoutePreloadingConfig): boolean;

    private configurePreloadingHook(): void {
        const original = this.shouldPreload;
        this.shouldPreload = (route) => {
            return this.preloadingGuard.hookSignal$.pipe(
                first(),
                filter(hook => hook === this.preloadingHook),
                switchMapTo(observify(original.call(this, route))),
            );
        };
    }

    private getOwnConfig(): IPreloadingPluginConfig {
        return this.pluginConfigs.find(config => {
            const configsPlugin = this.injector.get(config.plugin);

            if (!!configsPlugin === false) {
                return false;
            }

            return  !!config
                &&  !!config.plugin
                &&  configsPlugin.name === this.name
                ||  false;
        });
    }
}
