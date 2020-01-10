import { ROUTE_PRELOADING_CONFIG } from 'lib/tokens';
import { URGENTLY_PRELOADABLE } from 'lib/categories';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { NgxPreloadingModule } from 'lib';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPreloadingModule.forRoot(),
  ],
  providers: [
    {
      provide: ROUTE_PRELOADING_CONFIG,
      useValue: {
        route: 'auth',
        category: URGENTLY_PRELOADABLE
      },
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
