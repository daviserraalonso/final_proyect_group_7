import { Component, Input } from '@angular/core';
import { IUser } from '../../../interfaces/iUser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-studentCard-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './studentCard-component.html',
  styleUrl: './studentCard-component.css'
})
export class StudentCardComponent {
  @Input() miUser!: IUser

}
