import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoEmpleadosComponent } from './pago-empleados.component';

describe('PagoEmpleadosComponent', () => {
  let component: PagoEmpleadosComponent;
  let fixture: ComponentFixture<PagoEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoEmpleadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
