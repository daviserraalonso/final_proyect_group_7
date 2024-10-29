import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule,  } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-manager-component',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
  CommonModule],
  templateUrl: './task-manager-component.component.html',
  styleUrl: './task-manager-component.component.css'
})
export class TaskManagerComponentComponent {
  taskForm: FormGroup;
  selectedStudent: string = '';
  taskTitle: string = '';
  taskDescription: string = '';
  selectedFile: File | null = null;
  

  constructor(
    public dialogRef: MatDialogRef<TaskManagerComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { students: string[] },
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      task: [''],
      student: ['']
    });
  }

  onSave(): void {
    const task = {
      student: this.selectedStudent,
      title: this.taskTitle,
      description: this.taskDescription
    };
    this.dialogRef.close(task);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
}
