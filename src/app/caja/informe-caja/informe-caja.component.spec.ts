import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeCajaComponent } from './informe-caja.component';

describe('InformeCajaComponent', () => {
  let component: InformeCajaComponent;
  let fixture: ComponentFixture<InformeCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
