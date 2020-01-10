import { InjectionToken } from '@angular/core';
import { IRoutePreloadingConfig } from '../interfaces';

/**
 * @summary Provide this token to supply a config for a specific route.
 * @example
    NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            NgxPreloadingModule.forRoot(),
        ],
        providers: [{
            provide: ROUTE_PRELOADING_CONFIG,
            useValue: {
                route: 'auth',
                category: URGENTLY_PRELOADABLE
            },
            multi: true,
        }],
        bootstrap: [AppComponent]
    })
    export class AppModule {}
 */
export const ROUTE_PRELOADING_CONFIG = new InjectionToken<IRoutePreloadingConfig>(
    'Route preloading config'
);
