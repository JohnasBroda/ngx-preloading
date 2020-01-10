/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PluginManagerService } from './plugin-manager.service';

describe('Service: PluginManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PluginManagerService]
    });
  });

  it('should ...', inject([PluginManagerService], (service: PluginManagerService) => {
    expect(service).toBeTruthy();
  }));
});
