import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Attribute } from 'src/app/models/Attribute';
import { GenreService } from 'src/app/services/genre.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  public genres: Attribute[] = []
  public isLoggedIn = false

  
  public afterUserUpdated = () => {
    this.isLoggedIn = this.login.isLoggedIn()
  }

  constructor(
    private login: LoginService,
    private genreService: GenreService,
    private router: Router,
    ) {
      this.afterUserUpdated()
      this.login.userUpdated.subscribe(this.afterUserUpdated)  
    this.loadData()
   }
   
  private loadData() {
    this.genreService.getGenres().subscribe(res => {
      this.genres = res
    })
  }

  ngOnInit(): void {
  }

  onAddNewGenre() {
    this.router.navigate(['/addAttribute', 'genre'])
  }

  onClick(id: number) {
    this.router.navigate(['/genre', id])
  }
}
