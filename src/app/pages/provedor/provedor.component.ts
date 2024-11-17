import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarProvedoresComponent } from '../registrar-provedores/registrar-provedores.component';

interface Proveedor {
  id: number;
  nombre: string;
  empresa: string;  // Propiedad "empresa"
}

@Component({
  selector: 'app-provedor',
  standalone: true,
  imports: [CommonModule, RegistrarProvedoresComponent],  // Asegúrate de tener CommonModule
  templateUrl: './provedor.component.html',
  styleUrls: ['./provedor.component.css']
})
export class ProvedorComponent {
  showProvedorForm = false;  // Controla si se muestra el formulario
  proveedores: Proveedor[] = [];  // Lista de proveedores

  // Método para obtener la lista de proveedores desde la API
  async generarTabla() {
    try {
      const response = await fetch('http://localhost:8081/proveedor/traerTodos');
      const proveedores: Proveedor[] = await response.json();
      if (proveedores && proveedores.length > 0) {
        this.proveedores = proveedores;
      } else {
        this.proveedores = [];
      }
    } catch (error) {
      console.error('Error al obtener los proveedores:', error);
      this.proveedores = [];
    }
  }

  // Método para mostrar el formulario de agregar proveedor
  mostrarFormulario() {
    this.showProvedorForm = true;
  }

  // Método para ocultar el formulario
  cancelarFormulario() {
    this.showProvedorForm = false;
  }

  // Método para agregar un proveedor a la lista
  agregarProveedor(proveedor: Proveedor) {
    // Aquí puedes agregar la lógica para enviar los datos al servidor
    // Este código solo simula agregar un proveedor a la lista
    const nuevoProveedor: Proveedor = {
      id: this.proveedores.length + 1,  // ID simulado
      nombre: proveedor.nombre,
      empresa: proveedor.empresa
    };
    this.proveedores.push(nuevoProveedor);
    this.cancelarFormulario();  // Ocultar el formulario después de agregar el proveedor
  }

  // Método para eliminar un proveedor (si es necesario)
  eliminarProveedor(id: number) {
    console.log('Proveedor a eliminar:', id);
    // Aquí puedes agregar lógica para eliminar el proveedor, como una solicitud DELETE a la API
    this.proveedores = this.proveedores.filter(proveedor => proveedor.id !== id);
  }
}
