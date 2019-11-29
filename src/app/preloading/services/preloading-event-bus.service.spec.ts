/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PreloadingEventBusService } from './preloading-event-bus.service';

describe('Service: PreloadingEventBus', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreloadingEventBusService]
    });
  });

  it('should ...', inject([PreloadingEventBusService], (service: PreloadingEventBusService) => {
    expect(service).toBeTruthy();
  }));
});
