import { TestBed } from '@angular/core/testing';

import { HttpdomService } from './httpdom.service';

describe('HttpdomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpdomService = TestBed.get(HttpdomService);
    expect(service).toBeTruthy();
  });
});
