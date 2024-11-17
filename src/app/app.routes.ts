import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { GestionEmpleadosComponent } from './pages/gestion-empleados/gestion-empleados.component';
import { GestionVentasComponent } from './pages/gestion-ventas/gestion-ventas.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';

import { RegistrarEmpleadoComponent } from './pages/registrar-empleado/registrar-empleado.component';
import { ReporteVentasComponent } from './pages/reporte-ventas/reporte-ventas.component';
import { ReportePagosComponent } from './pages/reporte-pagos/reporte-pagos.component';
import { DocumentoComponent } from './pages/documento/documento.component';
import { GesrionProvedoresProductosComponent } from './pages/gesrion-provedores-productos/gesrion-provedores-productos.component';
import { ProvedorComponent } from './pages/provedor/provedor.component';
import { RegistrarProvedoresComponent } from './pages/registrar-provedores/registrar-provedores.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { RegitrarVentasComponent } from './pages/regitrar-ventas/regitrar-ventas.component';
import { RegistrarClienteComponent } from './pages/registrar-cliente/registrar-cliente.component';
import { RegistrarVentasComponent } from './pages/registrar-ventas/registrar-ventas.component';
import { GenerarFacturaComponent } from './pages/generar-factura/generar-factura.component';
import { RegistroProductosComponent } from './pages/registro-productos/registro-productos.component';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'administrador',
        pathMatch: 'full'
      },
      {
        path: 'administrador',
        component: AdministradorComponent
        
      },
      {
        path: 'empleado',
        component: EmpleadosComponent
      },
      {
        path: 'gestion-empleados',
        component: GestionEmpleadosComponent,
        children: [
          { path: 'registrar-empleados', component: RegistrarEmpleadoComponent }

        ]
      },
      {
        path: 'registrar-ventas',
        component: RegitrarVentasComponent,
        children: [
          { path: 'registrar-cliente', component: RegistrarClienteComponent },
          { path: 'registrar-ventass', component: RegistrarVentasComponent },
          { path: 'generar-factura', component: GenerarFacturaComponent }
        ]
      },
      {
        path: 'gestion-provedores-productos',
        component: GesrionProvedoresProductosComponent, // Corregido el nombre aquí
        children: [
          { path: 'provedor', component: ProvedorComponent },
          { path: 'producto', component: ProductoComponent },
          { path: 'registrar-provedor', component: RegistrarProvedoresComponent },
          { path: 'registrar-producto', component: RegistroProductosComponent }
        ]
      },
      {
        path: 'gestion-ventas',
        component: GestionVentasComponent,
        children: [
          { path: 'Reporte-Ventas', component: ReporteVentasComponent },
          { path: 'Reporte-Pagos', component: ReportePagosComponent },
          { path: 'Documento', component: DocumentoComponent }
        ]
      }
    ]
  }
];
