import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeServiciosComponent } from './informe-servicios.component';

describe('InformeServiciosComponent', () => {
  let component: InformeServiciosComponent;
  let fixture: ComponentFixture<InformeServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeServiciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
