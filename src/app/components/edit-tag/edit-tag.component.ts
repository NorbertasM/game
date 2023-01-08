import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from '../../models/Tag'
import { TagService } from 'src/app/services/tag.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent implements OnInit {
  public id: string
  public tag: Tag | null = null


  constructor(
    private route: ActivatedRoute,
    private tagService: TagService,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id']
    this.tagService.getTag(+this.id).subscribe(res => this.tag = res)
  }

  ngOnInit(): void {
  }

  public updateTag(f: NgForm) {
    this.tagService.updateTag({ id: +this.id, ...f.value})
    ?.subscribe(() => this.router.navigate(['allTags']))
  }

}
