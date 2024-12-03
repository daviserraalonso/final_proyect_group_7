import { Component, inject, Inject, Input } from '@angular/core';
import { CommentsComponent } from "../comments/comments.component";
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-teacher-view',
  standalone: true,
  imports: [CommentsComponent, MatCardModule, MatIconModule, MatDialogModule],
  templateUrl: './teacher-view.component.html',
  styleUrl: './teacher-view.component.css'
})
export class TeacherViewComponent {
  
  @Input() dialog = inject(MatDialogRef<TeacherViewComponent>, {optional: true})

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}

    ngOnInit() {
      console.log(this.data)
    }

    onClose() {
      this.dialog?.close()
    }
}
