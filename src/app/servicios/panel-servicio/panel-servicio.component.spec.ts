import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelServicioComponent } from './panel-servicio.component';

describe('PanelServicioComponent', () => {
  let component: PanelServicioComponent;
  let fixture: ComponentFixture<PanelServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
