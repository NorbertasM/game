import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attribute } from '../models/Attribute';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private readonly url = 'http://127.0.0.1:10000/tag'

  constructor(private http: HttpClient) { }

  public getTags() {
    return this.http.get<Attribute[]>(this.url)
  }
  
  public getTag(tagId: number) {
    return this.http.get<Attribute>(`${this.url}?id=${tagId}`)
  }
}
