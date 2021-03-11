import { TestBed } from '@angular/core/testing';

import { RoleadminService } from './roleadmin.service';

describe('RoleadminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleadminService = TestBed.get(RoleadminService);
    expect(service).toBeTruthy();
  });
});
