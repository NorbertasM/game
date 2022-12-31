import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/models/AuthUser';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public error = ''

  constructor(
    private auth: LoginService,
    private router: Router) { }

  ngOnInit(): void {
  }

  private afterSuccessLogin = (res: string) => {
    this.error = ''
    this.router.navigate(['/'])
  }
  
  private afterError = (res: any) => {
    this.error = 'Klaida bandant prisijungti' 
  }


  public onSubmit(f: NgForm) {
    const user = new AuthUser(f.value.email, f.value.password)

      this.auth.login(user).subscribe({
        next: this.afterSuccessLogin,
        error: this.afterError,
      })
  }
}
