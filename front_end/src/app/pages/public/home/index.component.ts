import { Component } from '@angular/core';
import { IndexComponent as CustomIndexComponent  } from "../../../components/public/index-component/index-component.component";
import { MapComponentComponent } from "../../../components/public/map-component/map-component.component";
import { FavoriteTeachersComponent } from "../favorite-teachers/favorite-teachers.component";


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CustomIndexComponent, MapComponentComponent, FavoriteTeachersComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent  {

}
