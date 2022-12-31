import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Attribute } from 'src/app/models/Attribute';
import { GameService } from 'src/app/services/game.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  public games: Attribute[] = []
  public tags: Record<number, Attribute[]> = []
  public genres: Record<number, Attribute[]> = []
  public loading: boolean = true
  public isLoggedIn = false

  
  public afterUserUpdated = () => {
    this.isLoggedIn = this.login.isLoggedIn()
  }

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private login: LoginService
    ) {   
      this.afterUserUpdated()
      this.login.userUpdated.subscribe(this.afterUserUpdated)  

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      const genreId = this.route.snapshot.params['genreId']
      const tagId = this.route.snapshot.params['tagId']

     this.loadData(genreId, tagId)
  }

  ngOnInit(): void {
  }

  
  onAddNewGame() {
    this.router.navigate(['/addGame'])
  }

  private loadData(genreId: number, tagId: number) {
    this.gameService.getGames(genreId, tagId).subscribe(res => {
      if (res) {
        this.games = res
        res.map(item => {
          this.gameService.getGameTag(item.id).subscribe(res => {
            if (res) {
              this.tags[item.id] = res
            }
          })
          this.gameService.getGameGenre(item.id).subscribe(res => {
            if (res) {
              this.genres[item.id] = res
            }
          })
        })
      }
      this.loading = false
    })
  }
}
