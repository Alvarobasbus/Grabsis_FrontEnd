import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEgresoComponent } from './modificar-egreso.component';

describe('ModificarEgresoComponent', () => {
  let component: ModificarEgresoComponent;
  let fixture: ComponentFixture<ModificarEgresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarEgresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarEgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
