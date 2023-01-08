import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attribute } from '../models/Attribute';
import { Tag } from '../models/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private readonly url = 'http://127.0.0.1:10000/tag'

  constructor(private http: HttpClient) { }

  public getTags() {
    return this.http.get<Tag[]>(this.url)
  }
  
  public getTag(tagId: number) {
    return this.http.get<Tag>(`${this.url}?id=${tagId}`)
  }
  
  public updateTag(data: Tag) {
    return this.http.put<Tag>(this.url, data)
  }
}
