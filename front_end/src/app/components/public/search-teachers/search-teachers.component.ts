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

@Component({
  selector: 'app-search-teachers',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonToggleModule, MatIconModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatSliderModule, MapComponentComponent, AsyncPipe, CommonModule],
  templateUrl: './search-teachers.component.html',
  styleUrl: './search-teachers.component.css'
})

export class SearchTeachersComponent {

  @ViewChild(MapComponentComponent) mapComponent!: MapComponentComponent

  searchServices = inject(SearchServiceService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
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
      minPrice: new FormControl(10, []),
      maxPrice: new FormControl(100, []),
      score: new FormControl(8, []),
      southWestLat: new FormControl(null, []),
      southWestLng: new FormControl(null, []),
      northEastLat: new FormControl(null, []),
      northEastLng: new FormControl(null, [])
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
    this.filters()
  }



  // Get list of teachers name
  async getTeacherName() {
    this.teachersName = await this.searchServices.getTeachersName()
  }

  // Get list of cities name
  async getCityName() {
    this.citiesName = await this.searchServices.getCitiesName()
  }


  // Get all categories
  async getCategories() {
    this.allCategories = await this.searchServices.getAllCategories()
  }
  
  // Get filtered list according to search fields
  async getSearchForm() {
    this.setBounds()
    const formData = new FormData();

    Object.keys(this.searchForm.value).forEach(index => {
      const data = this.searchForm.value[index];

      if (Array.isArray(data)) {
        data.forEach(item => {
          formData.append(index, item);
        })
      } else {
        formData.append(index, data)
      }
    });
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    this.teacherFilter = await this.searchServices.search(formData)
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

}
