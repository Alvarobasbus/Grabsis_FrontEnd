import { TestBed } from '@angular/core/testing';

import { GrabadoService } from './grabado.service';

describe('GrabadoService', () => {
  let service: GrabadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrabadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
