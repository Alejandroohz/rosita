import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

interface ProductoResponse {
  mensaje: string;
  status: string;
}

@Component({
  selector: 'app-registro-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-productos.component.html',
  styleUrls: ['./registro-productos.component.css']
})
export class RegistroProductosComponent implements OnInit {
  productoForm: FormGroup;
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      idProveedor: [0, Validators.required]
    });
  }

  ngOnInit(): void {}

  guardarProducto(): void {
    if (this.productoForm.valid) {
      const productoData = {
        idProducto: 0,
        proveedor: {
          idProveedor: this.productoForm.value.idProveedor,
          nombre: '',
          telefono: '',
          empresa: ''
        },
        nombre: this.productoForm.value.nombre,
        precio: this.productoForm.value.precio,
        stock: this.productoForm.value.stock
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post(
        'http://localhost:8081/producto/createProducto',
        productoData,
        { headers, responseType: 'text' as 'json' }  // Asegúrate de que el tipo sea consistente
      ).subscribe({
        next: (response) => {
          console.log('Respuesta exitosa:', response);
          this.mensajeExito = 'Producto registrado con éxito';
          this.mensajeError = '';
          this.productoForm.reset();

          // Opcional: Limpiar el mensaje de éxito después de 3 segundos
          setTimeout(() => {
            this.mensajeExito = '';
          }, 3000);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al crear el producto:', error);
          this.mensajeError = `Error al crear el producto: ${error.message}`;
          this.mensajeExito = '';

          // Opcional: Limpiar el mensaje de error después de 3 segundos
          setTimeout(() => {
            this.mensajeError = '';
          }, 3000);
        }
      });
    } else {
      this.mensajeError = 'Por favor, complete todos los campos requeridos';
      setTimeout(() => {
        this.mensajeError = '';
      }, 3000);
    }
  }
}
