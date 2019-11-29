/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OnDemandPreloadingStrategyService } from './on-demand-preloading-strategy.service';

describe('Service: OnDemandPreloadingStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnDemandPreloadingStrategyService]
    });
  });

  it('should ...', inject([OnDemandPreloadingStrategyService], (service: OnDemandPreloadingStrategyService) => {
    expect(service).toBeTruthy();
  }));
});
