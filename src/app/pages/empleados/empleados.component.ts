import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {
  options = [
    {
      label: 'Gestion de Ventas',
      description: 'Administra la información del personal, roles y permisos',
      icon: 'fa-solid fa-users',
      route: 'registrar-ventas'
    }
  ];

  constructor(private router: Router) {}

  navegarA(ruta: string) {
    this.router.navigate(['/dashboard/' + ruta]); 
  }
}
