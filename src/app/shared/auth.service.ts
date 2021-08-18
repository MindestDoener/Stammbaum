import { Injectable } from '@angular/core';
import { User } from './api/models/user';
import { UserApiService } from './api/user-api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private authenticated = false;
  private username = "";

  constructor(private userApi: UserApiService, private router: Router) {
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getUsername(): string {
    return this.username;
  }

  async login(user: User): Promise<boolean> {
    try {
      await this.userApi.login(user).toPromise();
      console.log('login successful')
      this.authenticated = true;
      this.username = user.username;
      return true;
    } catch (e) {
      console.log('login failed')
      return false
    }
  }

  async register(user: User): Promise<boolean> {
    try {
      await this.userApi.createUser(user).toPromise();
      console.log('registration successful')
      this.authenticated = true;
      this.username = user.username;
      return true;
    } catch (e) {
      console.log('registration failed')
      return false
    }
  }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  logout(): void {
    this.authenticated = false;
    this.router.navigate(['home'])
  }


}
