/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ConditionalPreloadingStrategyPlugin } from './conditional-preloading-strategy.service';

describe('Service: ConditionalPreloadingStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConditionalPreloadingStrategyPlugin]
    });
  });

  it('should ...', inject([ConditionalPreloadingStrategyPlugin], (service: ConditionalPreloadingStrategyPlugin) => {
    expect(service).toBeTruthy();
  }));
});
