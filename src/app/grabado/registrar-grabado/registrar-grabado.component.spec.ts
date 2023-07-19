import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarGrabadoComponent } from './registrar-grabado.component';

describe('RegistrarGrabadoComponent', () => {
  let component: RegistrarGrabadoComponent;
  let fixture: ComponentFixture<RegistrarGrabadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarGrabadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarGrabadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
