import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registrar-ventas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-ventas.component.html',
  styleUrls: ['./registrar-ventas.component.css']
})
export class RegistrarVentasComponent implements OnInit {
  detalleVentaForm: FormGroup;
  ventaForm: FormGroup;
  mensajeExitoDetalleVenta: string = '';
  mensajeExitoVenta: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.detalleVentaForm = this.fb.group({
      idProducto: [0, Validators.required],
      cantidad: [0, Validators.required]
    });

    this.ventaForm = this.fb.group({
      idCliente: [0, Validators.required],
      idEmpleado: [0, Validators.required],
      idDetalleVenta: [0, Validators.required]
    });
  }

  ngOnInit(): void {}

  crearDetalleVenta(): void {
    if (this.detalleVentaForm.valid) {
      const detalleVentaData = {
        idDetalleVenta: 0,
        producto: {
          idProducto: this.detalleVentaForm.get('idProducto')?.value,
          proveedor: {
            idProveedor: 0,
            nombre: '',
            telefono: '',
            empresa: ''
          },
          nombre: '',
          precio: 0,
          stock: 0
        },
        cantidad: this.detalleVentaForm.get('cantidad')?.value,
        subtotal: 0 // Aquí debes calcular el subtotal basado en la cantidad y el precio
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post('http://localhost:8081/detalleVenta/createDetalleVenta', detalleVentaData, { headers, responseType: 'json' })
        .subscribe({
          next: (response: any) => {
            this.mensajeExitoDetalleVenta = 'Detalle de venta creado correctamente';
            this.detalleVentaForm.reset();
            setTimeout(() => {
              this.mensajeExitoDetalleVenta = '';
            }, 3000);
          },
          error: (error: HttpErrorResponse) => {
            // Silently handle errors
          }
        });
    } else {
      // Silently handle form validation errors
    }
  }

  crearVenta(): void {
    if (this.ventaForm.valid) {
      const ventaData = {
        idVenta: 0,
        cliente: {
          idCliente: this.ventaForm.get('idCliente')?.value,
          nombre: '',
          apellido: '',
          telefono: ''
        },
        empleado: {
          idEmpleado: this.ventaForm.get('idEmpleado')?.value,
          nombre: '',
          apellido: '',
          puesto: '',
          salarioBase: 0
        },
        detalleVentas: [
          {
            idDetalleVenta: this.ventaForm.get('idDetalleVenta')?.value,
            producto: {
              idProducto: 0,
              proveedor: {
                idProveedor: 0,
                nombre: '',
                telefono: '',
                empresa: ''
              },
              nombre: '',
              precio: 0,
              stock: 0
            },
            cantidad: 0,
            subtotal: 0
          }
        ],
        total: 0, // Aquí debes calcular el total basado en los detalles de venta
        hora: new Date().toISOString()
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post('http://localhost:8081/venta/createVenta', ventaData, { headers, responseType: 'json' })
        .subscribe({
          next: (response: any) => {
            this.mensajeExitoVenta = 'Venta creada correctamente';
            this.ventaForm.reset();
            setTimeout(() => {
              this.mensajeExitoVenta = '';
            }, 3000);
          },
          error: (error: HttpErrorResponse) => {
            // Silently handle errors
          }
        });
    } else {
      // Silently handle form validation errors
    }
  }
}