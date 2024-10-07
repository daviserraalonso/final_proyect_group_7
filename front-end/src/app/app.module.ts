import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HomeComponent } from "./pages/home/home.component";
import { MapsComponent } from "./maps/maps.component";
import { FormRegisterComponent } from "./form-register/form-register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { FavoriteTeachersComponent } from "./favorite-teachers/favorite-teachers.component";

@NgModule({ declarations: [
        AppComponent,
        MainComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
    AppRoutingModule, HomeComponent, MapsComponent, FormRegisterComponent, DashboardComponent, FavoritesComponent, FavoriteTeachersComponent], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
