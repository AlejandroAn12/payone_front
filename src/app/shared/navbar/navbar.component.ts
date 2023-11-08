import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  public user!: User;
  constructor(private authService: AuthService) { 
    this.user = authService.user;
  }
  
  public notificaciones: any;


  mostrarModal: boolean = false;
  notificacionesPendientes: boolean = false;

  mostrarNotificaciones() {
    this.mostrarModal = true; // Mostrar el modal
  }

  cerrarNotificaciones() {
    this.mostrarModal = false; // Ocultar el modal
  }

  logOut() {
    this.authService.logOut();
  }

  // nuevasNotificaciones() {
  //   this.notificaciones.push(nuevaNotificacion); // Agregar nueva notificación a la matriz
  //   this.notificacionesPendientes = true; // Indicar que hay notificaciones pendientes
  // }
}
