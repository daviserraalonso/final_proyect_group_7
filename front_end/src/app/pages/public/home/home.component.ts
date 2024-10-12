import { Component } from '@angular/core';
import { FavoriteTeachersComponent } from "../../../components/public/favorite-teachers/favorite-teachers.component";
import { SearchTeachersComponent } from "../../../components/public/search-teachers/search-teachers.component";
import { WakeUpCallComponent } from "../../../components/public/wake-up-call/wake-up-call.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FavoriteTeachersComponent, SearchTeachersComponent, WakeUpCallComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
