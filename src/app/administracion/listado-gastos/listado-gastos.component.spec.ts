import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoGastosComponent } from './listado-gastos.component';

describe('ListadoGastosComponent', () => {
  let component: ListadoGastosComponent;
  let fixture: ComponentFixture<ListadoGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoGastosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
