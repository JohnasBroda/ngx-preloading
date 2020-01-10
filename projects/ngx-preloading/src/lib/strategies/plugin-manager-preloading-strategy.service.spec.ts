import { PluginManagerPreloadingStrategy } from './plugin-manager-preloading-strategy.service';
import { TestBed, inject } from '@angular/core/testing';


describe('Service: PluginManagerPreloadingStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PluginManagerPreloadingStrategy ]
    });
  });

  it('should ...',
    inject([PluginManagerPreloadingStrategy ], (service: PluginManagerPreloadingStrategy ) => {
      expect(service).toBeTruthy();
  }));
});
