import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-empleado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css']
})
export class RegistrarEmpleadoComponent {
  empleadoForm: FormGroup;
  usuarioForm: FormGroup;
  isLoading = false;
  baseUrl = 'http://localhost:8081';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.empleadoForm = this.fb.group({
      cc: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      salario: [0, [Validators.required, Validators.min(1)]]
    });

    this.usuarioForm = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cargo2: ['', [Validators.required]]  // Se añadió el control 'cargo2'
    });
  }

  guardarEmpleado() {
    if (this.empleadoForm.valid && !this.isLoading) {
      this.isLoading = true;

      const empleadoData = {
        idEmpleado: 0,
        cedula: this.empleadoForm.value.cc,
        nombre: this.empleadoForm.value.nombre,
        apellido: this.empleadoForm.value.apellido,
        puesto: this.empleadoForm.value.cargo,
        salarioHora: this.empleadoForm.value.salario
      };

      this.http.post(`${this.baseUrl}/empleado/crearEmpleado`, empleadoData)
        .subscribe({
          next: (response) => {
            console.log('Empleado guardado:', response);
            alert('Empleado registrado con éxito');
            this.isLoading = false;
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 201) {
              console.log('Empleado guardado:', error);
              alert('Empleado registrado con éxito');
            } else {
              console.error('Error al guardar empleado:', error);
              alert(this.getErrorMessage(error));
            }
            this.isLoading = false;
          }
        });
    } else {
      this.marcarFormularioComoTocado(this.empleadoForm);
    }
  }

  guardarUsuario() {
    if (this.usuarioForm.valid && this.empleadoForm.valid && !this.isLoading) {
      this.isLoading = true;

      const usuarioData = {
        id: 0,
        userName: this.usuarioForm.value.usuario,
        password: this.usuarioForm.value.password,
        horaLogin: new Date().toISOString(),
        rol: this.usuarioForm.value.cargo2 // Tomamos el cargo del formulario de usuario
      };

      this.http.post(`${this.baseUrl}/user/createUser`, usuarioData)
        .subscribe({
          next: (response) => {
            console.log('Usuario guardado:', response);
            alert('Usuario registrado con éxito');
            this.resetearFormularios();
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 201) {
              console.log('Usuario guardado:', error);
              alert('Usuario registrado con éxito');
              this.resetearFormularios();
            } else {
              console.error('Error al guardar usuario:', error);
              alert(this.getErrorMessage(error));
            }
            this.isLoading = false;
          }
        });
    } else {
      if (!this.empleadoForm.valid) {
        alert('Por favor, complete primero la información del empleado');
      }
      this.marcarFormularioComoTocado(this.usuarioForm);
    }
  }

  private resetearFormularios() {
    this.empleadoForm.reset();
    this.usuarioForm.reset();
    this.router.navigate(['/lista-empleados']);
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 201) {
      return 'Operación exitosa';
    }
    if (error.status === 0) {
      return 'Error de conexión. Verifica tu conexión a internet.';
    } else if (error.status === 400) {
      return 'Datos inválidos. Verifica la información.';
    } else if (error.status === 409) {
      return 'El registro ya existe en el sistema.';
    }
    return 'Error inesperado. Por favor intenta nuevamente.';
  }

  private marcarFormularioComoTocado(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
