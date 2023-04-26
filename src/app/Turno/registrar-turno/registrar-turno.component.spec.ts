import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTurnoComponent } from './registrar-turno.component';

describe('RegistrarTurnoComponent', () => {
  let component: RegistrarTurnoComponent;
  let fixture: ComponentFixture<RegistrarTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarTurnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
