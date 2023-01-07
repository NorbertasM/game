import { Component, OnInit } from '@angular/core';
import { Attribute } from 'src/app/models/Attribute';
import { GameService } from 'src/app/services/game.service';
import { LoginService } from 'src/app/services/login.service';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchResult } from 'src/app/models/SearchResult';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public error: string | undefined
  public data: SearchResult | undefined
  public tags: Record<number, Attribute[]> = []
  public genres: Record<number, Attribute[]> = []

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private login: LoginService,
    private searchService: SearchService) {
    const value = this.route.snapshot.params['value']

    this.loadData(value)
  }

  ngOnInit(): void {
  }


  loadData(value: string) {
    this.searchService.generalSearch(value).subscribe({
      next: (res) => {
        if (res) {
          this.data = res       

          res.games.map(item => {
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
      },
      error: (error) => {
        this.error = error.error
      }
    })
  }

  onGenreClick(id: number) {
    this.router.navigate(['/genre', id])
  }

  onTagClick(id: number) {
    this.router.navigate(['/tag', id])
  }
}
