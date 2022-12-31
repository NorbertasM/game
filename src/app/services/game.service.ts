import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Attribute } from '../models/Attribute';
import { Game } from '../models/Game';
import { GameGenre } from '../models/GameGenre';
import { GameTag } from '../models/GameTag';
import { NewGame } from '../models/NewGame';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly gameUrl = 'http://127.0.0.1:10000/game'
  private readonly gameGenreUrl = 'http://127.0.0.1:10000/gameGenre'
  private readonly gameTagUrl = 'http://127.0.0.1:10000/gameTag'

  constructor(private http: HttpClient) { }

  
  public getGames(genreId?: number, tagId?: number) {
    if (genreId) {
      return this.http.get<Attribute[]>(`${this.gameUrl}?genreId=${genreId}`)
    } else if (tagId) {
      return this.http.get<Attribute[]>(`${this.gameUrl}?tagId=${tagId}`)
    } else {
      return this.http.get<Attribute[]>(`${this.gameUrl}`)
    }
  }

  public getGameGenre(gameId: number) {
    return this.http.get<Attribute[]>(`${this.gameGenreUrl}?gameId=${gameId}`)
  }
  
  public getGameTag(gameId: number) {
    return this.http.get<Attribute[]>(`${this.gameTagUrl}?gameId=${gameId}`)
  }

  public addGame(game: NewGame) {
    return this.http.post<any>(this.gameUrl, game)
  }
}
