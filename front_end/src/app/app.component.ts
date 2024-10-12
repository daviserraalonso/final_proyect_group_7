import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HeaderPublicComponentComponent } from "./components/public/header-public-component/header-public-component.component";
import { FooterPublicComponentComponent } from "./components/public/footer-public-component/footer-public-component.component";
import { HomeComponent } from "./pages/public/home/home.component";
import { SearchTeachersComponent } from "./components/public/search-teachers/search-teachers.component";  // Importa el módulo del botón


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, HeaderPublicComponentComponent, FooterPublicComponentComponent, HomeComponent, SearchTeachersComponent],
  template: `
    <button mat-raised-button color="primary">¡Angular Material funciona!</button>
  `,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front_end';
}
