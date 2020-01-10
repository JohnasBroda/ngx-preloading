/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PreloadingSchedulerService } from './preloading-scheduler.service';

describe('Service: PreloadingScheduler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreloadingSchedulerService]
    });
  });

  it('should ...', inject([PreloadingSchedulerService], (service: PreloadingSchedulerService) => {
    expect(service).toBeTruthy();
  }));
});
