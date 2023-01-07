import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthUser } from '../models/AuthUser';
import { User } from '../models/User';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly url = 'http://127.0.0.1:10000/login'
  public token: string | null = null
  public userUpdated = new EventEmitter()

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
    }

  public onLoginSuccess = (res: string) => {
    this.token = res
    this.userUpdated.emit()
    localStorage.setItem('token', JSON.stringify(res))
  }

  public autoLogin() {
    const token = localStorage.getItem('token')

    if (token) {
      this.onLoginSuccess(JSON.parse(token))
    }
  }

  public login(userInfo: AuthUser) {
    return this.http.post<string>(this.url, userInfo).pipe(
      tap(this.onLoginSuccess)
    )
  }

  public logout() {
    this.token = null
    this.userUpdated.emit()
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }

  public isLoggedIn() {
    return !!this.token
  }
}
