import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Tag } from 'src/app/models/Tag';
import { SearchService } from 'src/app/services/search.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  public tags: Tag[] = []
  public error: string | undefined

  constructor(
    private router: Router,
    private tagsService: TagService,
    private searchService: SearchService
  ) {
    this.loadData()
  }

   clearError() {
    this.error = undefined
  }
  
  onSearch(f: NgForm) {
    this.error = ''
    if (f.value.value) {
      this.searchService.typedSearch<Tag>(f.value.value, 'tags').subscribe({
        error: (err) => {
          this.error = err.error
        },
        next: (res) => {
          if (res) {
            this.tags = res
          }
        }
      })
    } else {
      this.loadData()
    }
  }
   
  private loadData() {
    this.tagsService.getTags().subscribe(res => {
      this.tags = res
    })
  }
  ngOnInit(): void {
  }

  addNewTag() {
    this.router.navigate(['/addAttribute', 'tag'])
  }


  onClick(id: number) {
    this.router.navigate(['/tag', id])
  }

  onEdit(id: number) {
    this.router.navigate(['/editTag', id])
  }
}
