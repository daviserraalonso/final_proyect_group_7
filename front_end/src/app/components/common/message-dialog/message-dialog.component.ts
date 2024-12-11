import { Component, Inject } from '@angular/core';
import { 
  MAT_DIALOG_DATA, 
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle, 
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'

import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { InboxService } from '../../../service/inbox.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css'],
})
export class MessageDialogComponent {
  chat: any;
  newMessage: string = '';
  currentUserId: number;

  constructor(
    private dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { chat: any },
    private inboxService: InboxService
  ) {
    this.chat = data.chat; // get chat data
    this.currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id;
    
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      // get necessary data
      const chatId = this.chat.id; // CHAT ID
      const userId = this.currentUserId; // LOCAL USER
      const content = this.newMessage; // MESSAGE CONTENT
  
      // Envía el mensaje al backend
      this.inboxService.sendMessage(chatId, userId, content)
        .then(() => {
          // IF UPDATE OK SHOW MESSAGE
          const message = {
            sender: { name: 'Tú' }, // CHANGE USER SENDER TO "TU"
            content: this.newMessage,
            timestamp: new Date(),
          };
  
          this.chat.messages.push(message);
  
          // CLEAR INPUT
          this.newMessage = '';
        })
        .catch((error) => {
          console.error('Error al enviar el mensaje:', error);
          Swal.fire({
            text: 'Hubo un error al enviar el mensaje',
            width: 400,
            showConfirmButton: false,
            imageUrl: 'assets/logo.png',
            imageAlt: 'Icon image',
            imageHeight: 80,
            imageWidth: 60,
            timer: 2500
          });
        });
    }
  }
  

  /**
   * close dialog
   */
  close(): void {
    this.dialogRef.close();
  }
}
