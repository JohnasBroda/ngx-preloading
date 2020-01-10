import { TestBed, inject } from '@angular/core/testing';
import { OnDemandPreloadingService } from './on-demand-preloading.service';

describe('Service: OnDemandPreloading', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnDemandPreloadingService]
    });
  });

  it('should ...', inject([OnDemandPreloadingService], (service: OnDemandPreloadingService) => {
    expect(service).toBeTruthy();
  }));
});
