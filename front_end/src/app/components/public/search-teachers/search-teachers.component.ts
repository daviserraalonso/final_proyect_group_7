import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions,  MatCardSubtitle,  } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-search-teachers',
  standalone: true,
  imports: [RouterOutlet,FormsModule, MatIconModule,MatButton, MatCard, MatIcon,MatCard,MatCardActions,MatCardSubtitle,],
  templateUrl: './search-teachers.component.html',
  styleUrl: './search-teachers.component.css'
})
export class SearchTeachersComponent {
  searchQuery: string = '';
  categories = [
    { name: 'Matemáticas', icon: 'calculate' },
    { name: 'Inglés', icon: 'school' },
    { name: 'Programación', icon: 'searche' },
    
  ];

  selectCategory(category: any) {
    this.searchQuery = category.name;
  }
}
