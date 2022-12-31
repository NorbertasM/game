import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewAttribute } from 'src/app/models/NewAttribute';
import { AttributeService } from 'src/app/services/attribute.service';

@Component({
  selector: 'app-new-attribute',
  templateUrl: './new-attribute.component.html',
  styleUrls: ['./new-attribute.component.css']
})
export class NewAttributeComponent implements OnInit {
  public error = ''
  public isForTag = false

  constructor(
    private router: Router,
    private attribute: AttributeService,
    private route: ActivatedRoute,
  ) {
    const type = this.route.snapshot.params['type']

    if (type !== 'genre') {
      this.isForTag = true
    }
  }

  private afterError = (res: any) => {
    this.error = 'Klaida bandant sukurti naują atributą' 
  }


  ngOnInit(): void {
  }

  private afterSuccess = () => {
    const type = this.route.snapshot.params['type']


    this.router.navigate(type === 'genre' ? ['genres'] : ['allTags'])

  }

  public onSubmit(f: NgForm) {
    const attribute = new NewAttribute(f.value.name, f.value.image, !!f.value.forGame, !!f.value.forChannel)
    const type = this.route.snapshot.params['type']

    this.attribute.addAttribute(attribute, type).subscribe({
      error: this.afterError,
      next: this.afterSuccess
    })
  }

}
