import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar-dialog',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule
  ],
  template: `
    <div class="calendar-dialog">
      <h2>Calendario</h2>
      <mat-form-field appearance="outline">
  <mat-label>Selecciona una fecha</mat-label>
  <input matInput [matDatepicker]="picker" [(ngModel)]="selectedDate">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
      <div class="d-flex justify-content-end mt-3">
        <button mat-button color="primary" (click)="onClose()">Cerrar</button>
      </div>
    </div>
  `,
  styles: [`
    .calendar-dialog {
      padding: 24px; /* Espacio alrededor del contenido */
      max-width: 500px; /* Asegura que el ancho no sea muy pequeño */
    }
  
    h2 {
      margin-bottom: 16px;
      text-align: center;
    }
  
    mat-form-field {
      width: 100%;
    }
  
    .d-flex {
      display: flex;
    }
  
    .justify-content-end {
      justify-content: flex-end;
    }
  
    .mt-3 {
      margin-top: 16px;
    }
  `]

})
export class CalendarDialogComponent {
  selectedDate: Date | null = null;

  constructor(public dialogRef: MatDialogRef<CalendarDialogComponent>) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
