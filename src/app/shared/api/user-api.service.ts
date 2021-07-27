import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './models/user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { apiHttpOptions, apiUrl } from './api-settings';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {

  static API_KEY = environment.apiKey;

  constructor(private http: HttpClient) {
  }

  private static handleError(error: HttpErrorResponse): Observable<any> {
    return throwError('Error: ' + error.message);
  }

  // --------------------------------------------------- ENDPOINT CALLS --------------------------------------------------------------------

  login(user: User): Observable<any> {
    return this.http.post(apiUrl + 'login', user, apiHttpOptions).pipe(
      catchError(UserApiService.handleError),
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(apiUrl + 'users', user, apiHttpOptions).pipe(
      catchError(UserApiService.handleError),
    );
  }

  deleteUser(user: User): Observable<any> {
    return this.http.request('delete', apiUrl + 'users', { body: user, ...apiHttpOptions }).pipe(
      catchError(UserApiService.handleError),
    );
  }

  updatePassword(user: User, newPassword: string): Observable<User> {
    const body = { oldPassword: user.password, newPassword };
    return this.http.put<User>(apiUrl + 'users/' + user.username, apiHttpOptions).pipe(
      catchError(UserApiService.handleError),
    );
  }
}
