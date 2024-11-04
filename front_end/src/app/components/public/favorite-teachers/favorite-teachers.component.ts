import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

interface Teacher {
  name: string;
  area: string;
  rating: number;
  totalRatings: number;
  description?: string;
  imageUrl: string;
}

@Component({
  selector: 'app-favorite-teachers',
  templateUrl: './favorite-teachers.component.html',
  styleUrls: ['./favorite-teachers.component.css'],
  standalone: true,
  imports: [CommonModule
  ],
  animations: [
    trigger('cardHover', [
      transition(':hover', [
        animate('200ms ease-in', style({ transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }))
      ])
    ])
  ]
})

export class FavoriteTeachersComponent {
  // Añadir Math como propiedad de la clase
  
  
  teachers: Teacher[] = [
    {
      name: 'Gohan',
      area: 'Matematicas',
      rating: 4.9,
      totalRatings: 100,
      imageUrl: 'assets/gohan.jpg'
    },
    {
      name: 'Goku',
      area: 'Ingles',
      rating: 5.0,
      totalRatings: 200,
      description: 'Goku es un experto en inglés con un enfoque dinámico y divertido para el aprendizaje.',
      imageUrl: 'assets/goku.jpg'
    },
    {
      name: 'Vegeta',
      area: 'Ciencias',
      rating: 4.8,
      totalRatings: 150,
      imageUrl: 'assets/vegeta.jpg'
    }
  ];

  // Opcionalmente, podemos crear métodos helper para manejar la lógica de las estrellas
  getFullStars(rating: number): number[] {
    return Array(Math.floor(rating));
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 >= 0.5;
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.ceil(rating));
  }
}