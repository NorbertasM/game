import {Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { Attribute } from 'src/app/models/Attribute';
import { GameService } from 'src/app/services/game.service';
import { GenreService } from 'src/app/services/genre.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {
  public id: string
  public game: Attribute | null = null
  public genres: Attribute[] = []
  public tags: Attribute[] = []

  public selectedGenres: number[] = []
  public selectedTags: number[] = []

  public initialTags: any[] = []
  public initialGenres: any[] = []

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
    private genreService: GenreService,
    private tagService: TagService
  ) {
    this.id = this.route.snapshot.params['id']
    this.gameService.getGame(+this.id).subscribe(res => this.game = res)
    
    genreService.getGenres().subscribe(res => {
      this.genres = res
    })
    
    tagService.getTags().subscribe(res => {
      this.tags = res
    })

    gameService.getGameTag(+this.id).subscribe(res => {
      res.map((item) => {
        this.selectedTags.push(item.id)
        this.initialTags.push(item)
      })
    })
    gameService.getGameGenre(+this.id).subscribe(res => {
      res.map((item) => {
        this.selectedGenres.push(item.id)
        this.initialGenres.push(item)
    })
    })
  }

  ngOnInit(): void {
  }

  private sortIdArrays(initial: any[], selected: number[]) {
    const toDelete: number[] = []
    
    let toAdd = [...selected]

    initial.map(({ id, gameGenreId, gameTagId }) => {
      if (toAdd.includes(id)) {
        toAdd = toAdd.filter(item => item !== id)
      } else {
        if (gameGenreId) {
          toDelete.push(gameGenreId)
        } else {
          toDelete.push(gameTagId)
        }
      }
    })

    return { toAdd, toDelete }
  }
  
  public updateGame(f: NgForm) {
    const genres = this.sortIdArrays(this.initialGenres, this.selectedGenres)
    console.log(genres, this.initialGenres, this.selectedGenres)
    const tags = this.sortIdArrays(this.initialTags, this.selectedTags)

    this.gameService.updateGame({ id: +this.id, ...f.value})
    ?.subscribe(() => {
      this.gameService.addGameGenres(+this.id, genres.toAdd).subscribe(() => {
        this.gameService.deleteGameGenres(genres.toDelete).subscribe(() => {
          this.gameService.addGameTags(+this.id, tags.toAdd).subscribe(() => {
            this.gameService.deleteGameTags(tags.toDelete).subscribe(() => {
              this.router.navigate(['/'])
            })
          })
        })
      })
    })
  }

  
onGenreCheck(event: any, genreId: number) {
  if (event.target.checked) {
    this.selectedGenres.push(genreId)
  } else {
    this.selectedGenres = this.selectedGenres.filter(item => item !== genreId)
  }
}

onTagCheck(event: any, genreId: number) {
  if (event.target.checked) {
    this.selectedTags.push(genreId)
  } else {
    this.selectedTags = this.selectedTags.filter(item => item !== genreId)
  }
}
}
