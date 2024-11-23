import { Component, inject, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapComponentComponent } from '../map-component/map-component.component';
import { SearchServiceService } from '../../../service/search-service.service';
import { map, Observable, startWith } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import {AsyncPipe} from '@angular/common';
import { PROFESORES } from './datos.pruebas';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../pages/public/login/login.component';
import { HttpParams } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-search-teachers',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonToggleModule, MatIconModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatSliderModule, MapComponentComponent, AsyncPipe, CommonModule, MatCardModule],
  templateUrl: './search-teachers.component.html',
  styleUrl: './search-teachers.component.css'
})

export class SearchTeachersComponent {

  @ViewChild(MapComponentComponent) mapComponent!: MapComponentComponent

  searchServices = inject(SearchServiceService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  dialog = inject(MatDialog)
  hideMultipleSelectionIndicator = signal(false)

  teachersNameTest: string[] = ['Juan', 'Oscar', 'Pedro'] // Provisional para pruebas
  teachersCityTest: string[] = ['Barcelona', 'Sevilla', 'Madrid'] // Provisional para pruebas
  allTeachers: any[] = PROFESORES // Array provisonal para pruebas

  // Categorias para pruebas ---------------------
  categories = [
    { name: 'Matemáticas', icon: 'calculate' },
    { name: 'Inglés', icon: 'school' },
    { name: 'Programación', icon: 'searche' },
    { name: 'Música', icon: 'music_note' },
    { name: 'Ciencia', icon: 'globe' },
    { name: 'Frances', icon: 'school' },
  ];
  //-------------------------------------------

  teachersName: string[] = [] // Array to get list of teachers name
  citiesName: string[] = [] // Array to get list of cities name
  allCategories: any = [] // Array to get all categories
  teacherFilter!: any[] // Array to get filtered list teachers
  selectedCategory: string = ""
  radius!: number
  latCity!: number
  lngCity!: number

  bounds = {
    southWestLat: 41.0040347326615,
    southWestLng: 0.5508518835937526,
    northEastLat: 41.314212689980465,
    northEastLng: 1.6769505164062526
  }

  citySelected: string = ""

  cardActive: boolean = false

  filterName!: Observable<String[]>
  filterCity!: Observable<String[]>

  searchForm: FormGroup

  formSend: boolean = false


  // Form initialization
  constructor() {
    this.searchForm = new FormGroup({
      inputName: new FormControl("", []),
      inputCity: new FormControl("", []),
      selectedCategory: new FormControl([], []),
      minPrice: new FormControl(360, []),
      maxPrice: new FormControl(600, []),
      score: new FormControl(8, []),
      southWestLat: new FormControl(null, []),
      southWestLng: new FormControl(null, []),
      northEastLat: new FormControl(null, []),
      northEastLng: new FormControl(null, []),
      type: new FormControl(2, [])
    })
  }

  getBounds(event: any) {
    this.bounds = event
  }

  setBounds() {
    this.searchForm.get('southWestLat')?.patchValue(this.bounds.southWestLat)
    this.searchForm.get('southWestLng')?.patchValue(this.bounds.southWestLng)
    this.searchForm.get('northEastLat')?.patchValue(this.bounds.northEastLat)
    this.searchForm.get('northEastLng')?.patchValue(this.bounds.northEastLng)
  }

  ngOnInit() {
    this.viewCard()
    this.getTeacherName()
    this.getCityName()
    this.filters()
  }



  // Get list of teachers name
  async getTeacherName() {
    const data = await this.searchServices.getTeachersName()
    this.teachersName = data.map((teacher: {name: string}) => teacher.name)
  }

  // Get list of cities name
  async getCityName() {
    const data =  await this.searchServices.getCitiesName()
    this.citiesName = data.map((city: {details: {address: string}}) => city.details.address).filter((address: string): address is string => address !== null)
  }


  // Get all categories
  async getCategories() {
    this.allCategories = await this.searchServices.getAllCategories()
  }
  
  // Get filtered list according to search fields
  async getSearchForm() {
    this.setBounds()
    const params = new HttpParams({fromObject: this.searchForm.value})
    const teachers = await this.searchServices.search(params)
    this.teacherFilter  = [...teachers]
  }

  // Function to hide list of teachers in home page
  viewCard() {
    const route = this.router.url
    if (route === '/index') {
      this.cardActive = !this.cardActive
    } 
  }

  // Style sliders
  formatLabel(value: number): string {
    return `${value}`;
  }

  formatLabelScore(value: number): string {
    return `${value}`
  }

  // Change info zoom between components 
  changeRadius(event: Event) {
    const value = event.target as HTMLInputElement
    this.radius = Number(value.value)
  }

  zoom(event: number) {
    this.radius = event
  }

  // Functions to autocomplete fields
  filters() {
    this.filterName = this.searchForm.get('inputName')!.valueChanges.pipe(
      startWith(''), map(value => this.filterAutoName(value)) 
    );
    this.filterCity = this.searchForm.get('inputCity')!.valueChanges.pipe(
      startWith(''),map(value => this.filterAutoCity(value)) 
    );
  }
  filterAutoName(value: string): string[] {
    const filterValue = value.toLowerCase(); 
    return this.teachersNameTest.filter(name => name.toLowerCase().includes(filterValue))
  }

  filterAutoCity(value: string): string[] {
    const filterValue = value.toLowerCase(); 
    return this.teachersCityTest.filter(city => city.toLowerCase().includes(filterValue));
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

// Send info city to the map
async cityCenter() {
  const city = this.searchForm.get('inputCity')?.value
  const coords = await this.searchServices.getCityCords(city)
  this.latCity = Number(coords.lat)
  this.lngCity = Number(coords.lng)
}

}
