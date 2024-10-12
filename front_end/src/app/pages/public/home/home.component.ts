import { Component } from '@angular/core';
import { FavoriteTeachersComponent } from "../../../components/public/favorite-teachers/favorite-teachers.component";
import { SearchTeachersComponent } from "../../../components/public/search-teachers/search-teachers.component";
import { indexComponent } from "../../../components/public/index-component/index-component.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FavoriteTeachersComponent, SearchTeachersComponent, indexComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
