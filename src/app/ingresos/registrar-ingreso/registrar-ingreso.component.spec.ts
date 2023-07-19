import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarIngresoComponent } from './registrar-ingreso.component';

describe('RegistrarIngresoComponent', () => {
  let component: RegistrarIngresoComponent;
  let fixture: ComponentFixture<RegistrarIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarIngresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
