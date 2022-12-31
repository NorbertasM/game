import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public isLoggedIn = false

  public afterUserUpdated = () => {
    this.isLoggedIn = this.login.isLoggedIn()
  }

  constructor(
    private login: LoginService,
    private router: Router) {
    this.afterUserUpdated()
    this.login.userUpdated.subscribe(this.afterUserUpdated)
  }

  ngOnInit(): void {
  }

  public logout() {
    this.login.logout()
  }

  onClick() {
    if (this.isLoggedIn) {
      this.logout()
    } else {
      this.router.navigate(['/login'])    }
  }
}
