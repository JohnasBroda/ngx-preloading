/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockPreloadingStrategyService } from './mock-preloading-strategy.service';

describe('Service: MockPreloadingStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockPreloadingStrategyService]
    });
  });

  it('should ...', inject([MockPreloadingStrategyService], (service: MockPreloadingStrategyService) => {
    expect(service).toBeTruthy();
  }));
});
