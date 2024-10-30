import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageDetailComponentComponent } from '../message/message-detail-component/message-detail-component.component';
import { MessageComponentComponent } from '../message/message-component/message-component.component';
import { ReplyMessageComponent } from '../reply-message/reply-message.component';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
    NgFor,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatButton,
    MatCardContent,
    MatCardActions,
    
  ],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent {
  messages = [
    { subject: 'Reunión de seguimiento', sender: 'Juan Pérez', content: 'Tenemos una reunión programada para el próximo lunes.' },
    { subject: 'Entrega de Proyecto', sender: 'María López', content: 'Por favor, entrega el proyecto antes del viernes.' },
    { subject: 'Recordatorio de pago', sender: 'Carlos Fernández', content: 'Recuerda realizar el pago antes de final de mes.' },
  ];

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  showCustomSnackBar(message: string): void { 
    // Abre la snackbar con el componente personalizado
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 3000,
      horizontalPosition: 'center',
      data: message,
      direction: 'rtl',
      panelClass: ['custom-snackbar']
    });
  }
  openMessageDialog(message: any): void {
    const dialogRef = this.dialog.open(MessageDetailComponentComponent, {
      data: message,
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Mensaje revisado', 'Cerrar', { duration: 3000 });
      }
    });
  }

  replyMessage(message: any): void {
    const dialogRef = this.dialog.open(ReplyMessageComponent, {
      width: '90%',
      height:'90%', // Ajusta el ancho del diálogo aquí
      maxWidth: 'none',
      maxHeight: 'none',
      data: { students: this.getStudents(), replyTo: message.sender }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.messages.push(result);
        this.showCustomSnackBar('Mensaje enviado');
      }
    });
  }

  getStudents(): string[] {
    // Aquí puedes obtener la lista de estudiantes desde un servicio o una propiedad
    return ['Juan Pérez', 'María López', 'Carlos Fernández'];
  }

  newMessage(): void {
    const dialogRef = this.dialog.open(MessageComponentComponent, {
      width: '75%',
      height:'75%', // Ajusta el ancho del diálogo aquí
      maxWidth: 'none',
      maxHeight: 'none',
      data: { students: this.getStudents() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.messages.push(result);
        this.showCustomSnackBar('Mensaje enviado');
      }
    });
  }
}


