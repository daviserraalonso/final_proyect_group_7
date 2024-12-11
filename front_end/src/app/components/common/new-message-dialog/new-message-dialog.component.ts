import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InboxService } from '../../../service/inbox.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-message-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatDividerModule
  ],
  templateUrl: './new-message-dialog.component.html',
  styleUrls: ['./new-message-dialog.component.css'],
})
export class NewMessageDialogComponent {
  users: any[] = [];
  selectedUserId: number | null = null;
  messageContent: string = '';
  errorMessage: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<NewMessageDialogComponent>,
    private inboxService: InboxService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // CALL TO SERVICE TO GET ALL USERS
    this.inboxService.getAllUsers().then(
      (users) => {
        this.users = users;
        console.log(this.users)
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
        this.errorMessage = 'No se pudieron cargar los usuarios.';
      }
    );
  }

  sendMessage(): void {
    const content = this.messageContent.trim();
    const creatorId = JSON.parse(localStorage.getItem('user') || '{}').id; 

    if (!this.selectedUserId) {
      this.errorMessage = 'Debe seleccionar un usuario.';
      return;
    }
  
    this.inboxService.createNewChat(this.selectedUserId, creatorId, content)
    .then((response) => {
      Swal.fire({
        text: 'Chat creado',
        width: 400,
        showConfirmButton: false,
        imageUrl: 'assets/logo.png',
        imageAlt: 'Icon image',
        imageHeight: 80,
        imageWidth: 60,
        timer: 2500
      });
      location.reload();

      this.dialogRef.close(true);
    })
    .catch((error) => {
      console.error('Error al crear el chat:', error);
      this.errorMessage = 'Hubo un problema al crear el chat.';
    });
  }
}
