import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../../service/user-service.service';



@Component({
  selector: 'app-favorite-teachers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-teachers.component.html',
  styleUrls: ['./favorite-teachers.component.scss']
})
export class FavoriteTeachersComponent implements OnInit {
  favoriteTeachers: any[] = [];

  constructor(private UserServiceService: UserServiceService) {}

  ngOnInit(): void {
    this.UserServiceService.getFavoriteTeachers().subscribe(
      (data) => {
        console.log('Datos recibidos:', data); // Verifica los datos
        this.favoriteTeachers = data;
      },
      (error) => {
        console.error('Error al obtener profesores favoritos:', error);
      }
    );
  }
  
}
