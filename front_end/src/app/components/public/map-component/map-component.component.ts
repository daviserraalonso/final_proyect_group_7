import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, PLATFORM_ID, signal, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TypeCheckShimGenerator } from '@angular/compiler-cli/src/ngtsc/typecheck';
import { PROFESORES } from '../search-teachers/datos.pruebas';



@Component({
  selector: 'app-map-component',
  standalone: true,
  imports: [GoogleMapsModule, MatIconModule, MatDialogModule],
  templateUrl: './map-component.component.html',
  styleUrl: './map-component.component.css'
})
export class MapComponentComponent {


  @ViewChild(GoogleMap) map!: GoogleMap
  cdr!: ChangeDetectorRef

  @Input() AAteacherFilter: any[] = [] // OK
  teacherFilter: any[] = PROFESORES // Prueba

  @Input() radius!: number



  @Output() zoom: EventEmitter<number> = new EventEmitter<number>()
  @Output() bounds: EventEmitter<any> = new EventEmitter<any>()


  plataformId = inject(PLATFORM_ID)
  userLat: number = 0
  userLng: number = 0
  userPosition = signal<google.maps.LatLngLiteral>({ lat: 0, lng: 0 })
  mapZoom: number = 10

  mapOptions = signal<google.maps.MapOptions>({
    zoom: this.mapZoom,
    center: undefined,
    fullscreenControl: false,
    zoomControl: false,
  })

  boundsObject = {
    southWestLat: 41.0040347326615,
    southWestLng: 0.5508518835937526,
    northEastLat: 41.314212689980465,
    northEastLng: 1.6769505164062526
  }

  ngOnInit() {
    this.initLocation()
    this.zoom.emit(this.mapZoom)
    this.bounds.emit(this.boundsObject)
  }

  ngOnChanges() {
    this.mapOptions.set({
      zoom: this.radius,
      center: this.userPosition()
    })
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

  onMapChanges() {
    const bounds = this.map.getBounds()
    const southWest = bounds?.getSouthWest();
    const northEast = bounds?.getNorthEast()

    this.boundsObject = {
      southWestLat: southWest?.lat()!,
      southWestLng: southWest?.lng()!,
      northEastLat: northEast?.lat()!,
      northEastLng: northEast?.lng()!
    }

    const zoom = this.map.getZoom()
    this.zoom.emit(zoom)
    this.bounds.emit(this.boundsObject)
  }






}
