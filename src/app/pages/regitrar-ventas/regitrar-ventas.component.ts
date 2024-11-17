import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { RegistrarClienteComponent } from '../registrar-cliente/registrar-cliente.component';
import { RegistrarVentasComponent } from '../registrar-ventas/registrar-ventas.component';
import { GenerarFacturaComponent } from '../generar-factura/generar-factura.component';

@Component({
  selector: 'app-regitrar-ventas',
  standalone: true,
  imports: [CommonModule,RegistrarClienteComponent,RegistrarVentasComponent,GenerarFacturaComponent],
  templateUrl: './regitrar-ventas.component.html',
  styleUrl: './regitrar-ventas.component.css'
})
export class RegitrarVentasComponent {

  showcliente = false;
  showventas = false;
  showfactura = false;

  registrarcliente() {
    this.showcliente = true;
    this.showventas = false;
    this.showfactura =false;
  }

  registrarventas() {
    this.showcliente = false;
    this.showventas = true;
    this.showfactura =false;

  }

  generarfactura() {
    this.showcliente = false;
    this.showventas = false;
    this.showfactura =true;

  }


}
