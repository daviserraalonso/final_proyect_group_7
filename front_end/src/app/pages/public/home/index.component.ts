import { Component } from '@angular/core';
import { IndexComponent as CustomIndexComponent  } from "../../../components/public/index-component/index-component.component";
import { MapComponentComponent } from "../../../components/public/map-component/map-component.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CustomIndexComponent, MapComponentComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent  {

}
