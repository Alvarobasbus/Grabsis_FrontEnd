import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEgresoComponent } from './agregar-egreso.component';

describe('AgregarEgresoComponent', () => {
  let component: AgregarEgresoComponent;
  let fixture: ComponentFixture<AgregarEgresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEgresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
