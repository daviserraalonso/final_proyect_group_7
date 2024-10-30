import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reply-message',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reply-message.component.html',
  styleUrls: ['./reply-message.component.css'] // Cambié styleUrl a styleUrls
})
export class ReplyMessageComponent {
  messageForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<ReplyMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { students: string[], replyTo?: string },
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.messageForm = this.fb.group({
      recipient: [data.replyTo || '', Validators.required],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSend(): void {
    if (this.messageForm.valid) {
      const formData = new FormData();
      formData.append('recipient', this.messageForm.get('recipient')?.value);
      formData.append('subject', this.messageForm.get('subject')?.value);
      formData.append('content', this.messageForm.get('content')?.value);
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      // Aquí puedes manejar el envío del mensaje con el archivo adjunto
      console.log('Mensaje enviado:', formData);
      this.dialogRef.close(formData);
    } else {
      this.snackBar.open('Por favor, completa todos los campos obligatorios.', 'Cerrar', { duration: 3000 });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}