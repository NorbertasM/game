import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Attribute } from 'src/app/models/Attribute';
import { Tag } from 'src/app/models/Tag';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  public tags: Tag[] = []

  constructor(
    private router: Router,
    private tagsService: TagService,) {
    this.loadData()
   }

   
  private loadData() {
    this.tagsService.getTags().subscribe(res => {
      console.log(res)
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
}
