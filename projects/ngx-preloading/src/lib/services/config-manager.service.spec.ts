/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfigManagerService } from './config-manager.service';

describe('Service: ConfigManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigManagerService]
    });
  });

  it('should ...', inject([ConfigManagerService], (service: ConfigManagerService) => {
    expect(service).toBeTruthy();
  }));
});
