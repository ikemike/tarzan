import { TestBed } from '@angular/core/testing';

import { NodeProcessorService } from './node-processor.service';

describe('NodeProcessorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NodeProcessorService = TestBed.get(NodeProcessorService);
    expect(service).toBeTruthy();
  });
});
