import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Attribute } from 'src/app/models/Attribute';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent implements OnInit {
  public id: string
  public genre: Attribute | null = null

  constructor(
    private route: ActivatedRoute,
    private genreService: GenreService,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id']
    this.genreService.getGenre(+this.id).subscribe(res => this.genre = res)
  }

  ngOnInit(): void {
  }

  public updateGenre(f: NgForm) {
    this.genreService.updateGenre({ id: +this.id, ...f.value})
    ?.subscribe(() => this.router.navigate(['genres']))
  }
}
