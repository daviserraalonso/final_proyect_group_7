import { Component } from '@angular/core';

@Component({
  selector: 'app-how-work-component',
  standalone: true,
  imports: [],
  templateUrl: './how-work-component.component.html',
  styleUrl: './how-work-component.component.css'
})
export class HowWorkComponentComponent {

  cards = [
    { image: 'assets/professor1.jpeg', title: 'Clase con el profesor más cool' },
    { image: 'assets/professor2.jpg', title: 'Estudiantes comprometidos' },
    { image: 'assets/professor3.jpeg', title: 'Superprof destacado' },
    { image: 'assets/professor1.jpeg', title: 'Innovación en la educación' },
  ];
}
