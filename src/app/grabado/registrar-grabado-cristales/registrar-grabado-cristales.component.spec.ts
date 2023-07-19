import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarGrabadoCristalesComponent } from './registrar-grabado-cristales.component';

describe('RegistrarGrabadoCristalesComponent', () => {
  let component: RegistrarGrabadoCristalesComponent;
  let fixture: ComponentFixture<RegistrarGrabadoCristalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarGrabadoCristalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarGrabadoCristalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
