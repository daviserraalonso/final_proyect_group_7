import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-view-course',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public course: { id: number; name: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
