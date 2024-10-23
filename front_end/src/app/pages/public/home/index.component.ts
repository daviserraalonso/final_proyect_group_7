import { Component } from '@angular/core';
import { FavoriteTeachersComponent } from "../../../components/public/favorite-teachers/favorite-teachers.component";
import { SearchTeachersComponent } from "../../../components/public/search-teachers/search-teachers.component";
import { IndexComponent as CustomIndexComponent  } from "../../../components/public/index-component/index-component.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [FavoriteTeachersComponent, SearchTeachersComponent, CustomIndexComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent  {

}
