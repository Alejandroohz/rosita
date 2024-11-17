import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-generar-factura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generar-factura.component.html',
  styleUrls: ['./generar-factura.component.css']
})
export class GenerarFacturaComponent implements OnInit {
  facturaForm: FormGroup;
  mensajeExito: string = '';
  mensajeError: string = '';
  factura: any = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.facturaForm = this.fb.group({
      idVenta: [0, Validators.required]
    });
  }

  ngOnInit(): void {}

  generarFactura(): void {
    if (this.facturaForm.valid) {
      const idVenta = this.facturaForm.get('idVenta')?.value;
      const url = `http://localhost:8081/factura/traerUna/${idVenta}`;

      this.http.get(url).subscribe({
        next: (response) => {
          console.log('Factura generada:', response);
          this.factura = response;
          this.mensajeExito = 'Factura generada con éxito';
          this.mensajeError = '';
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al generar la factura:', error);
          this.mensajeError = `Error al generar la factura: ${error.message}`;
          this.mensajeExito = '';
        }
      });
    } else {
      this.mensajeError = 'Por favor, ingrese el ID de la venta';
      setTimeout(() => {
        this.mensajeError = '';
      }, 3000);
    }
  }
}
