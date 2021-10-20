import { Injectable } from '@angular/core';
import { UserApiService } from './api/user-api.service';
import { CanActivate, Router } from '@angular/router';
import { UserModel } from './api/models/userModel';
import { Observable } from 'rxjs/internal/Observable';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate{
  private authenticated = false;
  private username = '';

  constructor(private userApi: UserApiService, private router: Router, private storage: StorageService) {}

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getUsername(): string {
    return this.username;
  }

  async login(user: UserModel): Promise<boolean> {
    try {
      await this.userApi.login(user).toPromise();
      console.log('login successful');
      this.authenticated = true;
      this.username = user.username;
      this.storage.saveUser(user);
      return true;
    } catch (e) {
      console.log('login failed');
      return false;
    }
  }

  async register(user: UserModel): Promise<boolean> {
    try {
      await this.userApi.createUser(user).toPromise();
      console.log('registration successful');
      this.authenticated = true;
      this.username = user.username;
      this.storage.saveUser(user);
      return true;
    } catch (e) {
      console.log('registration failed');
      console.log(e)
      return false;
    }
  }

  canActivate(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (!this.isAuthenticated()) {
        const user = this.storage.getUser();
        if (user) {
          this.login(user).then((value) => {
            observer.next(value);
            observer.complete();
            if (!value) {
              this.router.navigate(['login']);
            }
          });
        } else {
          this.router.navigate(['login']);
          observer.next(false);
          observer.complete();
        }
      } else {
        observer.next(true);
        observer.complete();
      }

    });
  }

  logout(): void {
    this.authenticated = false;
    this.router.navigate(['home']);
    this.storage.removeUser()
  }
}
