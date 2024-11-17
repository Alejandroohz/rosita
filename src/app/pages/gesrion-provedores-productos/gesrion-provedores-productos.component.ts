import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvedorComponent } from '../provedor/provedor.component';
import { ProductoComponent } from '../producto/producto.component';

@Component({
  selector: 'app-gesrion-provedores-productos',
  standalone: true,
  imports: [CommonModule, ProvedorComponent, ProductoComponent], // Importa los componentes
  templateUrl: './gesrion-provedores-productos.component.html',
  styleUrls: ['./gesrion-provedores-productos.component.css']
})
export class GesrionProvedoresProductosComponent {
  showProvedor = false;
  showProductos = false;

  // Método para mostrar el componente de Proveedores
  mostrarProvedor() {
    this.showProvedor = true;
    this.showProductos = false;
  }

  // Método para mostrar el componente de Productos
  mostrarProductos() {
    this.showProductos = true;
    this.showProvedor = false;
  }
}
