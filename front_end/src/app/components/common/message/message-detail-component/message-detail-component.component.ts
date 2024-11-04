import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-inbox-component',
  standalone: true,
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
    NgFor,
    
  ],
  templateUrl: './message-detail-component.component.html',
  styleUrl: './message-detail-component.component.css'
})
export class MessageDetailComponentComponent {
  constructor(
    public dialogRef: MatDialogRef<MessageDetailComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}