import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Attribute } from 'src/app/models/Attribute';
import { NewGame } from 'src/app/models/NewGame';
import { GameService } from 'src/app/services/game.service';
import { GenreService } from 'src/app/services/genre.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {
  public genres: Attribute[] = []
  public tags: Attribute[] = []
  public error = ''

  public addedGenres: number[] = []
  public addedTags: number[] = []

  constructor(
    private router: Router,
    private game: GameService,
    private route: ActivatedRoute,
    private genreService: GenreService,
    private tagService: TagService
    ) {
      genreService.getGenres().subscribe(res => {
        console.log(res)
        this.genres = res
      })
      
      tagService.getTags().subscribe(res => {
        console.log(res)
        this.tags = res
      })

    }

  ngOnInit(): void {
  }


  private afterSuccess = (res: any) => {
    console.log(res)
    this.router.navigate(['/'])
  }


onGenreCheck(event: any, genreId: number) {
  if (event.target.checked) {
    this.addedGenres.push(genreId)
  } else {
    this.addedGenres = this.addedGenres.filter(item => item !== genreId)
  }
}

onTagCheck(event: any, genreId: number) {
  if (event.target.checked) {
    this.addedTags.push(genreId)
  } else {
    this.addedTags = this.addedTags.filter(item => item !== genreId)
  }
}

afterError() {
  this.error = 'Klaida Bandat pridėti naują žaidimą'
}

  public onSubmit(f: NgForm) {
    console.log(f.value, this.addedGenres, this.addedTags)
    const game = new NewGame(f.value.name, f.value.image, this.addedGenres, this.addedTags)

    this.game.addGame(game).subscribe({
      error: this.afterError,
      next: this.afterSuccess
    })
  }
}
