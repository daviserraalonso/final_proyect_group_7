import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { isPlatformBrowser } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import { EventEmitter } from 'stream';
import { PROFESORES } from './datos.prueba';


@Component({
  selector: 'app-map-component',
  standalone: true,
  imports: [GoogleMap, GoogleMapsModule, MapMarker, MatCardModule, MatIconModule, MatRadioModule, FormsModule],
  templateUrl: './map-component.component.html',
  styleUrl: './map-component.component.css'
})
export class MapComponentComponent {

  teachers: any = PROFESORES
  filterteacher: any = this.teachers


  myPosition = signal<google.maps.LatLngLiteral>({lat: 0, lng: 0});
  position = signal<google.maps.LatLngLiteral>({lat: 0, lng: 0});
  myLat: any = ""
  myLng: any = ""
  mapZoom = signal<number>(15)
  plataformId = inject(PLATFORM_ID)
  openWindow: MapInfoWindow | null = null

  mapOptins = signal({
    zoom: this.mapZoom()
  })
labelPosition: any;


prueba(event: any) {
  const filter = event.target.value
  console.log(event.target.value)
  this.filterteacher = this.teachers.filter((teacher: { materia: any; }) => teacher.materia == filter)
}


  createIcon() {
    if (isPlatformBrowser(this.plataformId)) {
    return {
      url: 'assets/icono.png' ,
      scaledSize: new google.maps.Size(50, 40)
    }
  } return null
}
  

   ngOnInit() {
    this.myLocation()

  }


  myLocation() {
    if (isPlatformBrowser(this.plataformId)) {
    navigator.geolocation.getCurrentPosition(position => {
      this.myLat = position.coords.latitude
      this.myLng = position.coords.longitude
      this.myPosition.set({lat: this.myLat, lng: this.myLng})
      this.position.set({lat: this.myLat, lng: this.myLng})
      this.mapOptins.set({
        zoom: this.mapZoom()
      })
      
    })
  }
  }

  teacherLocation(lat: number, lng: number) {
    this.position.set({lat: lat, lng: lng})
  }



  addMarkers(lat: any, lng: any) {
    if (isPlatformBrowser(this.plataformId)) {
        return new google.maps.LatLng(lat, lng)
  } return lat
}

openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow) {
  if(this.openWindow) {
    this.openWindow.close()
  }
  infoWindow.open(marker)
  this.openWindow = infoWindow

}



  // getDistance(lat: any, lon: any) {
  
  //   const url = `https://maps.googleapis.com/maps/api/distancematrix/json
  //   ?destinations=${lat}%2C${lon}
  //   &origins=${this.myLat}%2C${this.myLon}
  //   &key=${this.key}`
  // }

}


