import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeInsumosComponent } from './informe-insumos.component';

describe('InformeInsumosComponent', () => {
  let component: InformeInsumosComponent;
  let fixture: ComponentFixture<InformeInsumosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeInsumosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformeInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
