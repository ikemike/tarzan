import { TestBed } from '@angular/core/testing';

import { SitesConfigService } from './services/sites-config.service';

describe('SitesConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SitesConfigService = TestBed.get(SitesConfigService);
    expect(service).toBeTruthy();
  });
});
