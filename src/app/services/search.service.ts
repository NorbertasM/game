import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResult } from '../models/SearchResult';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly url = 'http://127.0.0.1:10000/search'

  constructor(private http: HttpClient) { }

  public generalSearch(value: string) {
    return this.http.get<SearchResult[]>(`${this.url}?value=${value}`)
  }
  
  public typedSearch<T>(value: string, type: 'game' | 'genre' | 'tags') {
    return this.http.get<T[]>(`${this.url}?value=${value}&by=${type}`)
  }
}
