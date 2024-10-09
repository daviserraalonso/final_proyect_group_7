import { AfterViewInit, Component, OnInit } from '@angular/core';
import { log } from 'console';
import * as L from 'leaflet';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent  implements OnInit {
  map: any;
  userLocation = { lat: 40.416775, lon: -3.703790 }; // Coordenadas del usuario (Madrid, ejemplo)
  teachers = [
    { name: 'Profesor 1', lat: 40.437869, lon: -3.819620 },
    { name: 'Profesor 2', lat: 40.331484, lon: -3.768937 },
    { name: 'Profesor 3', lat: 40.425540, lon: -3.689230 }
  ];
  maxDistance = 10; // Distancia máxima por defecto (en km)


  ngOnInit(): void {
    
  }

  applyDistanceFilter(): void {
    console.log('Distancia máxima:', this.maxDistance);
}
}