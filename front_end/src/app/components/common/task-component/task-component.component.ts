import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../../interfaces/itask';
import { TaskService } from '../../../service/task.service';

@Component({
  selector: 'app-task-component',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './task-component.component.html',
  styleUrls: ['./task-component.component.css']
})
export class TaskComponentComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['title', 'description', 'dueDate', 'completed'];

  constructor(private taskService: TaskService) {}

  async ngOnInit() {
    try {
      this.tasks = await this.taskService.getAllTasks();
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  }
}