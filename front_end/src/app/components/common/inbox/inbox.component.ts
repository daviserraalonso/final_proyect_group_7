import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { InboxService } from '../../../service/inbox.service';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';
import { MatButton } from '@angular/material/button';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { CommonModule } from '@angular/common';
import { NewMessageDialogComponent } from '../new-message-dialog/new-message-dialog.component';

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
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent {
  chats: any[] = []; // Datos de los chats obtenidos de la API
  userId: number = JSON.parse(localStorage.getItem('user') || '{}').id;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private inboxService: InboxService
  ) {}

  ngOnInit(): void {
    this.loadChats();
  }

  /**
   * LOAD CHAT FROM API
   */
  loadChats(): void {
    if (!this.userId) {
      this.showCustomSnackBar('No se encontró el usuario autenticado');
      return;
    }

    this.inboxService.getMessages(this.userId).subscribe(
      (response: any) => {
        this.chats = response.map((chat: any) => ({
          ...chat,
          messages: chat.messages || [], // Garantiza que siempre sea un array
          lastMessage: Array.isArray(chat.messages) && chat.messages.length > 0
            ? chat.messages[chat.messages.length - 1]
            : null,
        }));
      },
      (error) => {
        console.error('Error al cargar los chats:', error);
        this.showCustomSnackBar('Error al cargar los chats');
      }
    );
    
  }


  showCustomSnackBar(message: string): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 3000,
      horizontalPosition: 'center',
      data: message,
      direction: 'rtl',
      panelClass: ['custom-snackbar'],
    });
  }


  /**
   * INIT MODAL TO INIT NEW CHAT
   */
  newMessage(): void {
    const dialogRef = this.dialog.open(NewMessageDialogComponent, {
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        alert('Mensaje enviado con éxito');
      }
    });
  }
  

  openChat(chat: any): void {
    this.dialog.open(MessageDialogComponent, {
      width: '500px',
      data: { chat },
    });
  }
}
