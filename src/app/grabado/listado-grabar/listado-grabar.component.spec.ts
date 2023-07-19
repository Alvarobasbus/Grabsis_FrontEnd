import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoGrabarComponent } from './listado-grabar.component';

describe('ListadoGrabarComponent', () => {
  let component: ListadoGrabarComponent;
  let fixture: ComponentFixture<ListadoGrabarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoGrabarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoGrabarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
