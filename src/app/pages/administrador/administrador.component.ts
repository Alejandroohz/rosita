import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {
  options = [
    {
      label: 'Gestión de Empleados',
      description: 'Administra la información del personal, roles y permisos',
      icon: 'fa-solid fa-users',
      route: 'gestion-empleados'
    },

    { 
      label: 'Gestión de Provedores y productos', 
      description: 'Control de inventario, precios y categorías',
      icon: 'fa-solid fa-box',
      route: 'gestion-provedores-productos'
    },
    { 
      label: 'Gestión de Ventas', 
      description: 'Seguimiento de transacciones y reportes de ventas',
      icon: 'fa-solid fa-cart-shopping',
      route: 'gestion-ventas'
    }
  ];

  constructor(private router: Router) {}

  navegarA(ruta: string) {
    this.router.navigate(['/dashboard/' + ruta]); 
  }
}
