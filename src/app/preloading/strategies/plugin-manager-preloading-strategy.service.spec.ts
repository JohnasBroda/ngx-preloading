/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PluginManagerPreloadingStrategyService } from './plugin-manager-preloading-strategy.service';

describe('Service: PluginManagerPreloadingStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PluginManagerPreloadingStrategyService]
    });
  });

  it('should ...', inject([PluginManagerPreloadingStrategyService], (service: PluginManagerPreloadingStrategyService) => {
    expect(service).toBeTruthy();
  }));
});
