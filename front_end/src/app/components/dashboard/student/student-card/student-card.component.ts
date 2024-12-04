import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { IStudent } from '../../../../interfaces/iStudent';

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css']
})
export class StudentCardComponent {
  constructor(
    public dialogRef: MatDialogRef<StudentCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { student: IStudent }
  ) {}

  sendTask(): void {
    // Implementar lógica para enviar tarea
  }

  sendMessage(): void {
    // Implementar lógica para enviar mensaje
  }
}