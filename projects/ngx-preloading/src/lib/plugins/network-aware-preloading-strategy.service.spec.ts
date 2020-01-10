import { TestBed, inject } from '@angular/core/testing';
import { NetworkAwarePreloadingStrategyPlugin } from './network-aware-preloading-strategy.service';

describe('Service: NetworkAwarePreloadingStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkAwarePreloadingStrategyPlugin]
    });
  });

  it('should ...', inject([NetworkAwarePreloadingStrategyPlugin], (service: NetworkAwarePreloadingStrategyPlugin) => {
    expect(service).toBeTruthy();
  }));
});
