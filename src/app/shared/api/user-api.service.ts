import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserModel } from './models/userModel';
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

  login(user: UserModel): Observable<any> {
    return this.http.post(apiUrl + 'login', user, {...apiHttpOptions, responseType: 'text'}).pipe(
      catchError(UserApiService.handleError),
    );
  }

  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(apiUrl + 'users', user, apiHttpOptions).pipe(
      catchError(UserApiService.handleError),
    );
  }

  deleteUser(user: UserModel): Observable<any> {
    return this.http.request('delete', apiUrl + 'users', { body: user, ...apiHttpOptions }).pipe(
      catchError(UserApiService.handleError),
    );
  }

  updatePassword(user: UserModel, newPassword: string): Observable<UserModel> {
    const body = { oldPassword: user.password, newPassword };
    return this.http.put<UserModel>(apiUrl + 'users/' + user.username, body, apiHttpOptions).pipe(
      catchError(UserApiService.handleError),
    );
  }
}
