import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-public-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-public-component.component.html',
  styleUrl: './header-public-component.component.css'
})
export class HeaderPublicComponentComponent {

}
