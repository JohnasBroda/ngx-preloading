import { TestBed, inject } from '@angular/core/testing';
import { OnDemandPreloadingStrategyPlugin } from './on-demand-preloading-strategy.service';


describe('Service: OnDemandPreloadingStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnDemandPreloadingStrategyPlugin]
    });
  });

  test('should ...', inject([OnDemandPreloadingStrategyPlugin], (service: OnDemandPreloadingStrategyPlugin) => {
    expect(service).toBeTruthy();
  }));
});
