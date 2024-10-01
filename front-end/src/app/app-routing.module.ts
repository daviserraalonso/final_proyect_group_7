import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';  // Componente de ejemplo

const routes: Routes = [
  { path: '', component: MainComponent },  // Ruta principal
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Redirección de rutas no encontradas a la raíz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Asegúrate de usar RouterModule aquí
  exports: [RouterModule]
})
export class AppRoutingModule { }
