import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Attribute } from 'src/app/models/Attribute';
import { GameService } from 'src/app/services/game.service';
import { LoginService } from 'src/app/services/login.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  public games: Attribute[] = []
  public page = 0
  public count = 0
  public pagesCount = 0
  public tags: Record<number, Attribute[]> = []
  public genres: Record<number, Attribute[]> = []
  public loading: boolean = true
  public isLoggedIn = false
  public error: string | undefined
  
  public afterUserUpdated = () => {
    this.isLoggedIn = this.login.isLoggedIn()
  }

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private login: LoginService,
    private searchService: SearchService
    ) {   
      this.afterUserUpdated()
      this.login.userUpdated.subscribe(this.afterUserUpdated)  

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      const genreId = this.route.snapshot.params['genreId']
      const tagId = this.route.snapshot.params['tagId']

     this.loadData(genreId, tagId, this.page)
  }

  ngOnInit(): void {
  }

  onSearch(f: NgForm) {
    this.error = ''
    this.loading = true
    if (f.value.value) {
      this.searchService.typedSearch<Attribute>(f.value.value, 'game').subscribe({
        error: (err) => {
          this.error = err.error
          this.loading = false
        },
        next: (res) => {
          if (res) {
            this.onFetchGames(res)
          }
  
          this.loading = false
        }
      })
    } else {
      const genreId = this.route.snapshot.params['genreId']
      const tagId = this.route.snapshot.params['tagId']
      this.loadData(genreId, tagId, this.page)
    }
  }

  clearError() {
    this.error = undefined
  }
  
  onAddNewGame() {
    this.router.navigate(['/addGame'])
  }

  private loadData(genreId: number, tagId: number, page: number) {
    this.gameService.getGames(genreId, tagId, page).subscribe(res => {
      if (res) {
        this.count = res.count
        this.pagesCount = Math.floor(res.count / 19)
        this.onFetchGames(res.games)
      }
      this.loading = false
    })
  }

  private onFetchGames(games:Attribute[]) {
    this.games = games

    games.map(item => {
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

  onNextPage() {
    this.page += 1
    const genreId = this.route.snapshot.params['genreId']
    const tagId = this.route.snapshot.params['tagId']
    
    this.loadData(genreId, tagId, this.page)
    window.scrollTo(0, 0);
  }
  
  onPreviousPage() {
    if (this.page > 0) {
      this.page -= 1
      const genreId = this.route.snapshot.params['genreId']
      const tagId = this.route.snapshot.params['tagId']
      
      this.loadData(genreId, tagId, this.page)
      window.scrollTo(0, 0);
    }
  }
  
  onPageClick(page: number) {
    if (page >= 0) {
      this.page = page
      const genreId = this.route.snapshot.params['genreId']
      const tagId = this.route.snapshot.params['tagId']
      
      this.loadData(genreId, tagId, this.page)
      window.scrollTo(0, 0);
    }
  }
}