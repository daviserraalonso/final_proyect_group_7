// favorite-teachers.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite-teachers',
  standalone: true,
  imports: [FavoriteTeachersComponent, CommonModule, RouterLink],
  templateUrl: './favorite-teachers.component.html',
  styleUrls: ['./favorite-teachers.component.css']
})
export class FavoriteTeachersComponent {
  teachers = [
    {
      nombre: 'Gohan',
      area: 'Matemáticas',
      areaLink: '/area/matematicas',
      puntuacion: 4.9,
      calificaciones: 100,
      descripcion: 'Gohan es un profesor apasionado por las matemáticas con más de 10 años de experiencia.',
      img: 'assets/gohan.jpg'
    },
    {
      nombre: 'Goku',
      area: 'Inglés',
      areaLink: '/area/ingles',
      puntuacion: 5.0,
      calificaciones: 200,
      descripcion: 'Goku es un profesor dedicado y entusiasta, perfecto para aprender inglés.',
      img: 'assets/goku.jpg'
    },
    {
      nombre: 'Vegeta',
      area: 'Ciencias',
      areaLink: '/area/ciencias',
      puntuacion: 4.8,
      calificaciones: 150,
      descripcion: 'Vegeta tiene una gran pasión por las ciencias y una manera única de enseñar.',
      img: 'assets/vegeta.jpg'
    }
  ];
}