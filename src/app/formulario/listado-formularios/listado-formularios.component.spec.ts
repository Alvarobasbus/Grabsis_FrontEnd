import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoFormulariosComponent } from './listado-formularios.component';

describe('ListadoFormulariosComponent', () => {
  let component: ListadoFormulariosComponent;
  let fixture: ComponentFixture<ListadoFormulariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoFormulariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
