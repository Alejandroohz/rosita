import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { ReporteVentasComponent } from '../reporte-ventas/reporte-ventas.component';
import { ReportePagosComponent } from '../reporte-pagos/reporte-pagos.component';
import { DocumentoComponent } from '../documento/documento.component';

@Component({
  selector: 'app-gestion-ventas',
  standalone: true,
  imports: [CommonModule,ReporteVentasComponent,ReportePagosComponent,DocumentoComponent],
  templateUrl: './gestion-ventas.component.html',
  styleUrl: './gestion-ventas.component.css'
})
export class GestionVentasComponent {
  showReporteVentas = false;
  showReportePagos = false;
  showDocumento = false;

  CuadreCaja() {
    this.showReporteVentas = false;
    this.showReportePagos = false;
    this.showDocumento = false;
    
  }
  ReporteVentas() {
    this.showReporteVentas = true;
    this.showReportePagos = false;
    this.showDocumento = false;
    
  }

  ReportePagos() {
    this.showReportePagos = true;
    this.showReporteVentas = false;
    this.showDocumento = false;
    
  }

  Documento() {
    this.showDocumento = true;
    this.showReporteVentas = false;
    this.showReportePagos = false;
    
    
  }

}
