import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attribute } from '../models/Attribute';
import { NewAttribute } from '../models/NewAttribute';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {
  private readonly url = 'http://127.0.0.1:10000/'

  constructor(
    private http: HttpClient
  ) { }

  public addAttribute(attribute: NewAttribute, type: 'genre' | 'tag') {
    return this.http.post<Attribute>(`${this.url}${type}`, attribute)
  }
}
