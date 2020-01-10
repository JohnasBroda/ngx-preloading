import { Injector, OnInit, AfterViewInit, AfterContentInit, AfterContentChecked, AfterViewChecked } from '@angular/core';

export type PreloadingRootComponent =
        { injector: Injector; }
    &   OnInit
    &   AfterViewInit
    &   AfterViewChecked
    &   AfterContentInit
    &   AfterContentChecked
    &   { [key: string]: any };
