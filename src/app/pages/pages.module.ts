import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarComponent } from './buscar/buscar.component';
import { HomeComponent } from './home/home.component';
import { PeliculaComponent } from './pelicula/pelicula.component';



@NgModule({
  declarations: [
    BuscarComponent,
    HomeComponent,
    PeliculaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
