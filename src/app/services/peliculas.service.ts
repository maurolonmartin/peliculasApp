import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';

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
      return of([]);
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

  resetPage() {
    this.carteleraPage = 1;
  }

  buscarPelicula( texto: string): Observable<Movie[]> {

    const params = {...this.params, page: '1', query: texto }

    return this.http.get<CarteleraResponse>(`${this.baseURL}/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results)
    );
  }

  getDetallesPelicula( id: string) {
    return this.http.get<MovieResponse>(`${this.baseURL}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    );
  }

  getCast( id: string): Observable<Cast[]> {
    return this.http.get<CreditsResponse>(`${this.baseURL}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast),
      catchError( err => of([]))
    );
  }
}
