import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPorUsuarioComponent } from './listado-por-usuario.component';

describe('ListadoPorUsuarioComponent', () => {
  let component: ListadoPorUsuarioComponent;
  let fixture: ComponentFixture<ListadoPorUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPorUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPorUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
