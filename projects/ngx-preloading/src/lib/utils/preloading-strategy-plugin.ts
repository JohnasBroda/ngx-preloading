import { IPreloadingStrategyPlugin, IRoutePreloadingConfig } from '../interfaces';
import { Observable } from 'rxjs';
import { Route } from '@angular/router';
import { Injector } from '@angular/core';

/**
 * @summary The base class containing common logic for all preloading plugins.
 * @remarks Make sure that your own preloading plugins extend this class in order to make them work properly.
 */
export abstract class PreloadingStrategyPlugin implements IPreloadingStrategyPlugin {

    /**
     * @summary Short and descriptive name of the plugin that's used during logging.
     */
    public abstract readonly name: string;
    public abstract readonly injector: Injector;
    /**
     * @summary The field in a route's config that will be used to specify this particular plugin to preload said route.
     */
    public abstract readonly referralPhrase: string;

    /**
     * @summary The method that will be called by the PluginManagerPreloadingStrategy to determine if a particular route can be preloaded.
     */
    public abstract shouldPreload(route?: Route, config?: IRoutePreloadingConfig): boolean | Observable<boolean> | Promise<boolean>;

    public supports(
        route_?: Route,
        config?: IRoutePreloadingConfig
    ): boolean {
        const { pluginToUse, [this.referralPhrase]: configReference } = config;
        const preferredPlugin = !!pluginToUse
            ? this.injector.get(pluginToUse)
            : null;

        return !!configReference || preferredPlugin === this;
    }
}
