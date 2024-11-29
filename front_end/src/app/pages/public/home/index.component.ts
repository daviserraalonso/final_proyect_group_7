import { Component } from '@angular/core';
import { FavoriteTeachersComponent } from "../../../components/public/favorite-teachers/favorite-teachers.component";
import { IndexComponent as CustomIndexComponent  } from "../../../components/public/index-component/index-component.component";
import { MapComponentComponent } from "../../../components/public/map-component/map-component.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [FavoriteTeachersComponent, CustomIndexComponent, MapComponentComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent  {

}
