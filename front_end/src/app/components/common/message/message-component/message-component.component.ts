import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-message-component',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
  CommonModule],
  templateUrl: './message-component.component.html',
  styleUrl: './message-component.component.css'
})
export class MessageComponentComponent {
  subject: string = '';
  content: string = '';
  selectedStudent: string = '';

  constructor(
    public dialogRef: MatDialogRef<MessageComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { students: string[] }
  ) {}

  onSend(): void {
    // Aquí puedes manejar el envío del mensaje
    console.log('Mensaje enviado:', this.subject, this.content, this.selectedStudent);
    this.dialogRef.close({ subject: this.subject, content: this.content, student: this.selectedStudent });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}