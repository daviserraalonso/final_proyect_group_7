import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TeacherService } from '../../../service/teacher-service.service';
@Component({
  selector: 'app-favorite-teachers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorite-teachers.component.html',
  styleUrls: ['./favorite-teachers.component.css']
})
export class FavoriteTeachersComponent {
  
  teachers: any[] = []; // Lista para almacenar los profesores

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.teacherService.getTopTeachers().subscribe(
      (data) => {
        this.teachers = data; // Almacena los profesores obtenidos
      },
      (error) => {
        console.error('Error al obtener los profesores', error);
      }
    );
  }

  getStarsArray(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const starsArray = Array(fullStars).fill('★');
    return starsArray;
  }


  truncateDescription(description: string, limit: number): string {
    return description.length > limit ? description.substring(0, limit) + '...' : description;
  }
}

