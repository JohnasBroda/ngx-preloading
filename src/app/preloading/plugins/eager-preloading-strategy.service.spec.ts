/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { EagerPreloadingStrategyPlugin } from './eager-preloading-strategy.service';

describe('Service: EagerPreloadingStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EagerPreloadingStrategyPlugin]
    });
  });

  it('should ...', inject([EagerPreloadingStrategyPlugin], (service: EagerPreloadingStrategyPlugin) => {
    expect(service).toBeTruthy();
  }));
});
