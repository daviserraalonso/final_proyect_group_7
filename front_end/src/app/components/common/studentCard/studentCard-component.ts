import { Component, Input } from '@angular/core';
import { IUser } from '../../../interfaces/iUser';

@Component({
  selector: 'app-studentCard-component',
  standalone: true,
  imports: [],
  templateUrl: './studentCard-component.html',
  styleUrl: './studentCard-component.css'
})
export class StudentCardComponent {
  @Input() miUser!: IUser

}
