import { TestBed } from '@angular/core/testing';

import { CartincreaseService } from './cartincrease.service';

describe('CartincreaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartincreaseService = TestBed.get(CartincreaseService);
    expect(service).toBeTruthy();
  });
});
