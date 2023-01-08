import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Attribute } from '../models/Attribute';
import { Game } from '../models/Game';
import { GameGenre } from '../models/GameGenre';
import { GameTag } from '../models/GameTag';
import { GetGameRes } from '../models/GetGameRes';
import { NewGame } from '../models/NewGame';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly gameUrl = 'http://127.0.0.1:10000/game'
  private readonly gameGenreUrl = 'http://127.0.0.1:10000/gameGenre'
  private readonly gameTagUrl = 'http://127.0.0.1:10000/gameTag'

  constructor(private http: HttpClient) { }

  
  public getGames(genreId: number | undefined, tagId: number | undefined, page: number) {
    if (genreId) {
      return this.http.get<GetGameRes>(`${this.gameUrl}?genreId=${genreId}&step=19&page=${page}`)
    } else if (tagId) {
      return this.http.get<GetGameRes>(`${this.gameUrl}?tagId=${tagId}&step=19&page=${page}`)
    } else {
      return this.http.get<GetGameRes>(`${this.gameUrl}?step=19&page=${page}`)
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
