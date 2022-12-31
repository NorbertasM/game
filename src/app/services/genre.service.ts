import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attribute } from '../models/Attribute';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private readonly url = 'http://127.0.0.1:10000/genre'

  constructor(private http: HttpClient) { }

  public getGenres() {
    return this.http.get<Attribute[]>(this.url)
  }

  public getGenre(genreId: number) {
    return this.http.get<Attribute>(`${this.url}?id=${genreId}`)
  }
}
