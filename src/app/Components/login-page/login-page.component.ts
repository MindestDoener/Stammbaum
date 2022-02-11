import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  translation = new Map([['login', 'Login'], ['register', 'Create an Account']]);

  form = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    username: new FormControl(),
    birthdate: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
  });

  success = true;
  errorMessage = '';

  routingName = 'register';

  isLogin(): boolean {
    return this.routingName === 'login';
  }

  constructor(private router: Router, private auth: AuthService) {
  }

  ngOnInit(): void {
    if (this.router.url === '/login') {
      this.routingName = 'login';
    }
  }

  authenticate(): void {
    if (this.routingName === 'login') {
      this.login();
    } else {
      this.register();
    }
  }

  async login(): Promise<void> {
    this.success = await this.auth.login({ ...this.form.value });
    if (this.success) {
      this.router.navigate(['trees']);
    }
    this.errorMessage = 'Username or Password wrong!';
  }

  async register(): Promise<void> {

    if (this.form.value.password === this.form.value.confirmPassword) {
      this.success = await this.auth.register({ ...this.form.value });
      if (this.success) {
        this.router.navigate(['trees']);
      }
      this.errorMessage = 'Username is already taken!';
    } else {
      this.success = false;
      this.errorMessage = 'Make sure that your repeated password matches with the initial one!'
    }
  }

}
