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

  async ngOnInit(): Promise<void> {
    try {
      const data = await this.UserServiceService.getFavoriteTeachers();
      
      this.favoriteTeachers = data.map(item => ({
        name: item.User.name,
        description: item.User.details.description,
        image: item.User.details.img_url
      }));
    } catch (error) {
      console.error('Error al obtener profesores favoritos:', error);
    }
  }
  
}
