import { Injectable } from '@angular/core';
import { UserApiService } from './api/user-api.service';
import { Router } from '@angular/router';
import { UserModel } from './api/models/userModel';

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

  async login(user: UserModel): Promise<boolean> {
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

  async register(user: UserModel): Promise<boolean> {
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
