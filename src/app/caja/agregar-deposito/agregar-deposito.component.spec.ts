import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDepositoComponent } from './agregar-deposito.component';

describe('AgregarDepositoComponent', () => {
  let component: AgregarDepositoComponent;
  let fixture: ComponentFixture<AgregarDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarDepositoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
