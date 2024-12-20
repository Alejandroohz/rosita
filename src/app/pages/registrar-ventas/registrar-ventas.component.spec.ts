import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVentasComponent } from './registrar-ventas.component';

describe('RegistrarVentasComponent', () => {
  let component: RegistrarVentasComponent;
  let fixture: ComponentFixture<RegistrarVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarVentasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
