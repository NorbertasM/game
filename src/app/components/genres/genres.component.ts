import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Attribute } from 'src/app/models/Attribute';
import { GenreService } from 'src/app/services/genre.service';
import { LoginService } from 'src/app/services/login.service';
import { SearchService } from 'src/app/services/search.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  public genres: Attribute[] = []
  public isLoggedIn = false
  public error: string | undefined

  
  public afterUserUpdated = () => {
    this.isLoggedIn = this.login.isLoggedIn()
  }

  constructor(
    private login: LoginService,
    private genreService: GenreService,
    private router: Router,
    private searchService: SearchService
    ) {
      this.afterUserUpdated()
      this.login.userUpdated.subscribe(this.afterUserUpdated)  
      this.loadData()
  }

  clearError() {
    this.error = undefined
  }
  
  onSearch(f: NgForm) {
    this.error = ''
    if (f.value.value) {
      this.searchService.typedSearch<Attribute>(f.value.value, 'genre').subscribe({
        error: (err) => {
          this.error = err.error
        },
        next: (res) => {
          if (res) {
            this.genres = res
          }
        }
      })
    } else {
      this.loadData()
    }
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
