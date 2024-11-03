import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteTeachersComponent } from './favorite-teachers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    FavoriteTeachersComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    FavoriteTeachersComponent
  ]
})
export class FavoriteTeachersModule { }