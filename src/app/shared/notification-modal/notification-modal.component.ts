import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css'],
})
export class NotificationModalComponent {
  @Input() mostrarModal: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>();

  cerrar() {
    console.log('CERRANDO MODAL');
    this.mostrarModal = false; // Cierra el modal
    this.cerrarModal.emit(); // Emite el evento de cierre
  }
}
