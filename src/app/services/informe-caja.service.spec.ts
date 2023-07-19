import { TestBed } from '@angular/core/testing';

import { InformeCajaService } from './informe-caja.service';

describe('InformeCajaService', () => {
  let service: InformeCajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformeCajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
