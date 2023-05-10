import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMarcaComponent } from './registrar-marca.component';

describe('RegistrarMarcaComponent', () => {
  let component: RegistrarMarcaComponent;
  let fixture: ComponentFixture<RegistrarMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarMarcaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
