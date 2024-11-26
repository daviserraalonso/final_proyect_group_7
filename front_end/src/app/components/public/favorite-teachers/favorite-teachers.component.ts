import { Component, inject, OnInit } from '@angular/core';
import { TeacherService } from '../../../service/teacher-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-teachers',
  standalone: true,  // Add this line
  imports: [CommonModule],
  templateUrl: './favorite-teachers.component.html',
  styleUrls: ['./favorite-teachers.component.css'],
})
export class FavoriteTeachersComponent implements OnInit {
  teachers: any[] = [];
  constructor(private teacherService: TeacherService) {}
  


  async ngOnInit() {
   await this.loadTeachersData()  
  }
 

  async loadTeachersData() {
    try {
      // Llamar a todas las APIs en paralelo
      const [names, categories] = await Promise.all([
        this.teacherService.getTeachersNames(),
        this.teacherService.getCategoryTeachers(),
        // this.teacherService.getRatingTeachers(),
        // this.teacherService.getDescriptionTeachers()
      ]);

      // Combinar los datos en un solo array
      this.teachers = names.map((teacher, index) => ({
        ...teacher, // Incluir datos del nombre
        category: categories[index]?.category_name || 'No especificada',
        // rating: ratings[index]?.rating || 0,
        // description: descriptions[index]?.description || 'Sin descripción'
      }));

    } catch (error) {
      console.error('Error al obtener los profesores', error); // Manejar errores
    }
  }

  getStarsArray(rating: number): string[] {
    const fullStars = Math.floor(rating);
    return Array(fullStars).fill('★');
  }

  truncateDescription(description: string, limit: number): string {
    return description.length > limit ? description.substring(0, limit) + '...' : description;
  }
}
