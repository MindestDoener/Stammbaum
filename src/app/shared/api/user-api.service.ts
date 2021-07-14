import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {

  static API_KEY = environment.apiKey;
  baseUrl = environment.baseApiUrl;
  httpOptions = { headers: UserApiService.getHeaders(), observe: 'body' as const, responseType: 'json' as const };

  constructor(private http: HttpClient) {
  }

  private static getHeaders(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json').set('X-API-Key', this.API_KEY);
  }

  private static handleError(error: HttpErrorResponse): Observable<any> {
    return throwError('Error: ' + error.message);
  }

  // --------------------------------------------------- ENDPOINT CALLS --------------------------------------------------------------------

  login(user: User): Observable<any> {
    return this.http.post(this.baseUrl + 'login', user, this.httpOptions).pipe(
      catchError(UserApiService.handleError),
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'users', user, this.httpOptions).pipe(
      catchError(UserApiService.handleError),
    );
  }

  deleteUser(user: User): Observable<any> {
    return this.http.request('delete', this.baseUrl + 'users', { body: user, ...this.httpOptions }).pipe(
      catchError(UserApiService.handleError),
    );
  }

  updatePassword(user: User, newPassword: string): Observable<User> {
    const body = { oldPassword: user.password, newPassword };
    return this.http.put<User>(this.baseUrl + 'users/' + user.username, this.httpOptions).pipe(
      catchError(UserApiService.handleError),
    );
  }
}
