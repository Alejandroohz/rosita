import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  userName: string;
  password: string;
  rol: string;
}

interface LoginResponse {
  success: boolean;
  rol: string;
  error?: string;  // Añadir la propiedad 'error' opcional
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginObj: User = {
    userName: '',
    password: '',
    rol: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin(): void {
    console.log('Login button clicked');
    console.log('Login data:', this.loginObj);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    if (!this.loginObj.userName || !this.loginObj.password || !this.loginObj.rol) {
      alert('Por favor complete todos los campos');
      return;
    }

    this.http.post<LoginResponse>('http://localhost:8081/user/verify', 
      this.loginObj, 
      { 
        headers: headers,
        observe: 'response'
      })
      .subscribe({
        next: (response) => {
          if (response.body && response.status === 200) {
            console.log('Login exitoso:', response);
            const userRole = response.body.rol.toLowerCase();
            this.redirectBasedOnRole(userRole);
          } else {
            console.log('Error en el login:', response.body?.error);
            alert('Error en el login: ' + (response.body?.error || 'Error desconocido'));
          }
        },
        error: (error) => {
          console.error('Error en login:', error);
          if (error.status === 404) {
            alert('Error en el login: Usuario no encontrado');
          } else if (error.status === 406) {
            alert('Error en el login: Solicitud no aceptable. Por favor revisa los datos ingresados.');
          } else {
            alert('Error en el login: ' + (error.message || 'Usuario o contraseña incorrectos'));
          }
        }
      });
  }

  private redirectBasedOnRole(role: string): void {
    switch (role) {
      case 'administrador':
        this.router.navigate(['/dashboard/administrador']);
        break;
      case 'empleado':
        this.router.navigate(['/dashboard/empleado']);
        break;
      default:
        alert('Rol no reconocido');
        break;
    }
  }
}
