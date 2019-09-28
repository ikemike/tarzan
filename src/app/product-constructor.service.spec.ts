import { TestBed } from '@angular/core/testing';

import { ProductConstructorService } from './product-constructor.service';

describe('ProductConstructorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductConstructorService = TestBed.get(ProductConstructorService);
    expect(service).toBeTruthy();
  });
});
