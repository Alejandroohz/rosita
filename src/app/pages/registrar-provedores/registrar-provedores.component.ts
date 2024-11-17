import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

interface ProveedorResponse {
  mensaje: string;
  status: string;
}

@Component({
  selector: 'app-registrar-provedores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-provedores.component.html',
  styleUrls: ['./registrar-provedores.component.css']
})
export class RegistrarProvedoresComponent implements OnInit {
  proveedorForm: FormGroup;
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      empresa: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  guardarProveedor(): void {
    if (this.proveedorForm.valid) {
      const proveedorData = this.proveedorForm.value;
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post<ProveedorResponse>(
        'http://localhost:8081/proveedor/createProveedor',
        proveedorData,
        { headers }
      ).subscribe({
        next: (response) => {
          console.log('Respuesta exitosa:', response);
          this.mensajeExito = response.mensaje;
          this.mensajeError = '';
          this.proveedorForm.reset();
          
          // Opcional: Limpiar el mensaje de éxito después de 3 segundos
          setTimeout(() => {
            this.mensajeExito = '';
          }, 3000);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al crear el proveedor:', error);
          this.mensajeError = error.error?.mensaje || 'Error al crear el proveedor';
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
