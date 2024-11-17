import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { PagoEmpleadosComponent } from '../pago-empleados/pago-empleados.component';
import { RegistrarEmpleadoComponent } from '../registrar-empleado/registrar-empleado.component';
@Component({
  selector: 'app-gestion-empleados',
  templateUrl: './gestion-empleados.component.html',
  styleUrls: ['./gestion-empleados.component.css'],
  standalone: true,
  imports: [CommonModule, RegistrarEmpleadoComponent,PagoEmpleadosComponent] // Añade CommonModule a imports
})
export class GestionEmpleadosComponent {
  showRegistroEmpleado = false;
  showPagoEmpleado = false;

  agregarEmpleado() {
    this.showRegistroEmpleado = true;
    this.showPagoEmpleado = false;
  }

  pagoEmpleado() {
    this.showPagoEmpleado = true;
    this.showRegistroEmpleado = false;
  }
}
