import { Component, inject, Input, Output, signal, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchServiceService } from '../../../service/search-service.service';
import { HttpParams } from '@angular/common/http';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { UserServiceService } from '../../../service/user-service.service';


@Component({
  selector: 'app-search-teachers',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonToggleModule, MatIconModule, MatFormFieldModule, MatAutocompleteModule, AsyncPipe, MatSliderModule, MatButtonModule, MatInputModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './search-teachers.component.html',
  styleUrl: './search-teachers.component.css'
})

export class SearchTeachersComponent {

  @Output() newRadius: EventEmitter<number> = new EventEmitter<number>()
  @Output() teachers: EventEmitter<any> = new EventEmitter<any>()

  @Input() mapZoom!: number | undefined
  @Input() newbounds!: any


  searchServices = inject(SearchServiceService)
  userServices = inject(UserServiceService)
  hideMultipleSelectionIndicator = signal(false)


  searchForm: FormGroup

  teacherFilter!: any[] // Array to get filtered list teachers
  teachersName: string[] = [] // Array to get list of teachers name
  citiesName: string[] = [] // Array to get list of cities name
  allCategories: any = [] // Array to get all categories
  allModalities: any = [] // Array to get all categories
  selectedCategory: string = ""
  radius! : number

  bounds = {
    southWestLat: 41.0040347326615,
    southWestLng: 0.5508518835937526,
    northEastLat: 41.314212689980465,
    northEastLng: 1.6769505164062526
  }



  filterName!: Observable<String[]>
  filterCity!: Observable<String[]>


  latCity!: number
  lngCity!: number

  filterActive: boolean = true










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
      type: new FormControl([], [])
    })

 
  }

  ngOnInit() {
    this.getCategories()
    this.getModalities()
    this.getTeacherName()
    this.getCityName()
    this.filters()




  }


  setBounds() {
    this.bounds = this.newbounds
    this.searchForm.get('southWestLat')?.patchValue(this.bounds.southWestLat)
    this.searchForm.get('southWestLng')?.patchValue(this.bounds.southWestLng)
    this.searchForm.get('northEastLat')?.patchValue(this.bounds.northEastLat)
    this.searchForm.get('northEastLng')?.patchValue(this.bounds.northEastLng)
  }

  onScroll(event: WheelEvent): void {
    const container = event.currentTarget as HTMLElement;
    container.scrollLeft += event.deltaY; // Desplazamiento con el scroll del mouse
    event.preventDefault(); // Evita el desplazamiento vertical por defecto
  }
  
   // Get list of teachers name
   async getTeacherName() {
    const data = await this.searchServices.getTeachersName()
    this.teachersName = data.map((teacher: {name: string}) => teacher.name)
  }

  // Get list of cities name
  async getCityName() {
    const data =  await this.searchServices.getCitiesName()
    console.log(data)
    this.citiesName = data.map((city: {details?: {address?: string}}) => city.details?.address).filter((address: string): address is string => address !== null)
  }


  // Get all categories
  async getCategories() {
    this.allCategories = await this.searchServices.getAllCategories()
  }

    // Get all modalities
    async getModalities() {
      this.allModalities = await this.searchServices.getAllModalities()
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
    return this.teachersName.filter(name => name.toLowerCase().includes(filterValue))
  }

  filterAutoCity(value: string): string[] {
    const filterValue = value.toLowerCase(); 
    return this.citiesName.filter(city => city.toLowerCase().includes(filterValue));
  }


  async getSearchForm() {
    this.setBounds()
    const params = new HttpParams({fromObject: this.searchForm.value})
    console.log(params)
    const teachers = await this.searchServices.search(params)
    console.log(teachers)
    this.teacherFilter  = [...teachers]
    this.teachers.emit(this.teacherFilter)
  }

    // Style sliders
    // formatLabel(value: number): string {
    //   return `${value}`;
    // }
  
    // formatLabelScore(value: number): string {
    //   return `${value}`
    // }

      // Change info zoom between components 
  changeRadius(event: Event) {
    const value = event.target as HTMLInputElement
    this.radius = Number(value.value)
    this.newRadius.emit(this.radius)
  }

  // Send info city to the map
async cityCenter() {
  const city = this.searchForm.get('inputCity')?.value
  const coords = await this.searchServices.getCityCords(city)
  this.latCity = Number(coords.lat)
  this.lngCity = Number(coords.lng)
}

activeFilters(): void {
  this.filterActive = !this.filterActive
}















}