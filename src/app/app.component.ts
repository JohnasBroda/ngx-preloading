import { Component, Inject, Injector, INJECTOR } from '@angular/core';
import { PRELOADING_CONFIG } from 'lib';
import { GuardedHooks } from 'lib/decorators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@GuardedHooks()
export class AppComponent {
  title = 'ngx-preloading';

  constructor(
    @Inject(PRELOADING_CONFIG) private configs,
    @Inject(INJECTOR) public injector: Injector,
  ) {}

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    
  }
}
