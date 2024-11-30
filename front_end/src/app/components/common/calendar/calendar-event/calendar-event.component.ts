import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-calendar-event',
  standalone: true,
  imports: [MatDialogModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule],
  templateUrl: './calendar-event.component.html',
  styleUrl: './calendar-event.component.css'
})
export class CalendarEventComponent {
  constructor(
    public dialogRef: MatDialogRef<CalendarEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
