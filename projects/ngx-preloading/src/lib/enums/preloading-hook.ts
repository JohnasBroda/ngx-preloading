/**
 * @summary An enum specifying the various life cycle events that can be used to schedule preloading.
 * @remarks The hooks specified are all applicable to the root component of the application.
 */
export enum PreloadingHook {
    /**
     * @alias constructor
     */
    Immediate = 'constructor',
    /**
     * @alias ngOnInit
     */
    OnInit = 'ngOnInit',
    /**
     * @alias ngAfterContentInit
     */
    AfterContentInit = 'ngAfterContentInit',
    /**
     * @alias ngAfterContentChecked
     */
    AfterContentChecked = 'ngAfterContentChecked',
    /**
     * @alias ngAfterViewInit
     */
    AfterViewInit = 'ngAfterViewInit',
    /**
     * @alias ngAfterViewChecked
     */
    AfterViewChecked = 'ngAfterViewChecked',
}
