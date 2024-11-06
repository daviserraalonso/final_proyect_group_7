import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite-teachers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorite-teachers.component.html',
  styleUrls: ['./favorite-teachers.component.css']
})
export class FavoriteTeachersComponent {
  teachers = [
    {
      nombre: 'Gohan',
      area: 'Matemáticas',
      areaLink: '/area/matematicas',
      puntuacion: 2.9,
      calificaciones: 100,
      descripcion: 'Gohan es un profesor apasionado por las matemáticas con más de 10 años de experiencia.',
      img: 'assets/professor1.jpeg'
    },
    {
      nombre: 'Goku',
      area: 'Inglés',
      areaLink: '/area/ingles',
      puntuacion: 5.0,
      calificaciones: 200,
      descripcion: 'Goku es un profesor dedicado y entusiasta, perfecto para aprender inglés.',
      img: 'assets/professor2.jpg'
    },
    {
      nombre: 'Vegeta',
      area: 'Ciencias',
      areaLink: '/area/ciencias',
      puntuacion: 4.8,
      calificaciones: 150,
      descripcion: 'Vegeta tiene una gran pasión por las ciencias y una manera única de enseñar.',
      img: 'assets/professor3.jpeg'
    }
  ];


  getStarsArray(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const starsArray = Array(fullStars).fill('★');
    return starsArray;
  }


  truncateDescription(description: string, limit: number): string {
    return description.length > limit ? description.substring(0, limit) + '...' : description;
  }
}

