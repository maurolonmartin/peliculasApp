import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseURL = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor( private http: HttpClient ) { }

  get params() {
    return {
      api_key: '166550abaf2535fb8ba4d6f13aba5948',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera():Observable<Movie[]> {

    if(this.cargando) {
      return of([])
    }

    return this.http.get<CarteleraResponse>(`${this.baseURL}/movie/now_playing?`,{
      params: this.params
    }).pipe(
      map( resp => resp.results),
      tap( () => {
        this.carteleraPage += 1;
      })
    );
  }
}
