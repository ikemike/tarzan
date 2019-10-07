import { TestBed } from '@angular/core/testing';

import { ProductValidatorService } from './product-validator.service';

describe('ProductValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductValidatorService = TestBed.get(ProductValidatorService);
    expect(service).toBeTruthy();
  });
});
