import { TestBed } from '@angular/core/testing';

import { ProductRetrieverService } from './services/product-retriever.service';

describe('ProductRetrieverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductRetrieverService = TestBed.get(ProductRetrieverService);
    expect(service).toBeTruthy();
  });
});
