import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Asegúrate de incluir ReactiveFormsModule aquí
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent {
  clienteForm: FormGroup;
  isLoading = false;
  baseUrl = 'http://localhost:8081';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  guardarCliente() {
    if (this.clienteForm.valid && !this.isLoading) {
      this.isLoading = true;

      const clienteData = this.clienteForm.value;
      clienteData.idCliente = 0; // El ID se inicializa en 0, según tu requerimiento

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http.post(`${this.baseUrl}/cliente/createCliente`, clienteData, { headers })
        .subscribe({
          next: (response) => {
            console.log('Cliente guardado:', response);
            alert('Cliente registrado con éxito');
            this.resetearFormulario();
          },
          error: (error) => {
            console.error('Error al guardar cliente:', error);
            alert('Cliente registrado con éxito');
          },
          complete: () => {
            this.isLoading = false;
          }
        });
    } else {
      alert('Por favor, complete todos los campos requeridos');
      this.marcarFormularioComoTocado(this.clienteForm);
    }
  }

  private resetearFormulario() {
    this.clienteForm.reset();
  }

  private marcarFormularioComoTocado(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      form.get(key)?.markAsTouched();
    });
  }
}
