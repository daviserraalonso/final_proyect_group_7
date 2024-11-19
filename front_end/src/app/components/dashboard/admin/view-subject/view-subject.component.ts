import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-view-subject',
  standalone: true,
  templateUrl: './view-subject.component.html',
  styleUrls: ['./view-subject.component.css'],
  imports: [MatDialogModule, MatButtonModule, NgIf],
})
export class ViewSubjectComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
