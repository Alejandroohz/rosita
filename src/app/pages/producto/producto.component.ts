import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistroProductosComponent } from "../registro-productos/registro-productos.component";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  proveedor: { idProveedor: number; nombre: string; telefono: string; empresa: string };
}

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, RegistroProductosComponent],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  showProductoForm = false; // Controla si se muestra el formulario
  productos: Producto[] = []; // Lista de productos

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de productos desde la API
  async generarTabla() {
    try {
      const response = await fetch('http://localhost:8081/producto/traerTodos');
      const productos: Producto[] = await response.json();
      if (productos && productos.length > 0) {
        this.productos = productos;
      } else {
        this.productos = [];
      }
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      this.productos = [];
    }
  }

  // Método para mostrar el formulario de agregar producto
  mostrarFormulario() {
    this.showProductoForm = true;
  }

  // Método para ocultar el formulario
  cancelarFormulario() {
    this.showProductoForm = false;
  }

  // Método para agregar un producto
  agregarProducto(producto: Producto) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<Producto>('http://localhost:8081/producto/createProducto', producto, { headers })
      .subscribe({
        next: (response) => {
          console.log('Producto agregado:', response);
          alert('Producto registrado con éxito');
          this.productos.push(response);
          this.cancelarFormulario();
        },
        error: (error: any) => {
          console.error('Error al agregar producto:', error);
          alert('Error al registrar el producto');
        }
      });
  }

  // Método para eliminar un producto (si es necesario)
  eliminarProducto(id: number) {
    console.log('Producto a eliminar:', id);
    this.productos = this.productos.filter(producto => producto.id !== id);
  }
}
