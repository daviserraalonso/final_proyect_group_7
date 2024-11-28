
import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal, ViewChild} from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { MatIconModule } from '@angular/material/icon';
import { PROFESORES } from '../search-teachers/datos.pruebas';
import { SearchTeachersComponent } from "../search-teachers/search-teachers.component";
import { Router } from '@angular/router';
import { LoginComponent } from '../../../pages/public/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-map-component',
  standalone: true,
  imports: [GoogleMapsModule, MatIconModule, SearchTeachersComponent, MatCardModule, MatButtonModule, SearchTeachersComponent],
  templateUrl: './map-component.component.html',
  styleUrl: './map-component.component.css'
})
export class MapComponentComponent {

  @ViewChild(GoogleMap) map!: GoogleMap


plataformId = inject(PLATFORM_ID)
router = inject(Router)
dialog = inject(MatDialog)
userLat: number = 0
userLng: number = 0
userPosition = signal<google.maps.LatLngLiteral>({ lat: 0, lng: 0 })
mapZoom: number | undefined = 10
teachersList: any[] = []

  mapOptions = signal<google.maps.MapOptions>({
    zoom: this.mapZoom,
    center: undefined,
    fullscreenControl: false,
    zoomControl: false,
  })

  bounds = {
    southWestLat: 41.0040347326615,
    southWestLng: 0.5508518835937526,
    northEastLat: 41.314212689980465,
    northEastLng: 1.6769505164062526
  }

  cardActive: boolean = false




  teacherFilter: any[] = PROFESORES // Prueba



  ngOnInit() {
    this.initLocation()
    // this.zoom.emit(this.mapZoom)
    // this.bounds.emit(this.boundsObject)
  }

  initLocation() {
    if (isPlatformBrowser(this.plataformId)) {
      navigator.geolocation.getCurrentPosition(position => {
        this.userLat = position.coords.latitude
        this.userLng = position.coords.longitude
        this.userPosition.set({ lat: this.userLat, lng: this.userLng })
        this.mapOptions.set({
          zoom: this.mapZoom,
          center: this.userPosition(),
          fullscreenControl: false,
          zoomControl: false,
        })
      })
    }
  }

    // create a Mark for teacher
    addMarkers(lat: any, lng: any) {
      if (isPlatformBrowser(this.plataformId)) {
        return new google.maps.LatLng(lat, lng)
      } return lat
    }

      // Function to hide list of teachers in home page
  viewCard() {
    const route = this.router.url
    if (route === '/index') {
      this.cardActive = !this.cardActive
    } 
  }

    getNewRadius(newRadius: number) {
      this.mapZoom = newRadius
      this.mapOptions.set({
        zoom: this.mapZoom,
        center: this.userPosition()
      })
    }

    getTeachersList(data: []) {
      this.teachersList = data
      console.log(this.teachersList)
    }

    onMapChanges() {
      const bounds = this.map.getBounds()
      const southWest = bounds?.getSouthWest();
      const northEast = bounds?.getNorthEast()
  
      this.bounds = {
        southWestLat: southWest?.lat()!,
        southWestLng: southWest?.lng()!,
        northEastLat: northEast?.lat()!,
        northEastLng: northEast?.lng()!
      }
  
      const zoom = this.map.getZoom()
      this.mapZoom = this.map.getZoom()
      //this.bounds.emit(this.boundsObject)
      
    }

      // Open view teachers details
  openDialog(event: Event, teacher: any) {
    const token = localStorage.getItem('token');
    if(!token) {
      event.preventDefault();
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '90%',
        height:'90%', 
        maxWidth: 'none',
        maxHeight: 'none',
      })
    } else {
    event.preventDefault(); 
    this.dialog.open(LoginComponent, { // aqui se carga el componente de la vista del profesor
      width: '90%',
      height:'90%', 
      maxWidth: 'none',
      maxHeight: 'none',
      data: {
        teacher: teacher
      },
    });
  }
}




}