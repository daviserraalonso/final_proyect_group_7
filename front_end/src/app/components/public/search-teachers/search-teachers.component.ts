import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MapComponentComponent } from '../map-component/map-component.component';

@Component({
  selector: 'app-search-teachers',
  standalone: true,
  imports: [RouterOutlet,FormsModule, MapComponentComponent],
  templateUrl: './search-teachers.component.html',
  styleUrl: './search-teachers.component.css'
})
export class SearchTeachersComponent {
  searchQuery: string = '';
  categories = [
    { name: 'Matemáticas', icon: 'bi bi-calculator' },
    { name: 'Inglés', icon: 'bi bi-book' },
    { name: 'Programación', icon: 'bi bi-code-square' },
    // Añade más categorías según sea necesario
  ];

  selectCategory(category: any) {
    this.searchQuery = category.name;
  }
}
