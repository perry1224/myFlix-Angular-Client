import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//**Declaring the API URL that provides data for the application */
const apiUrl = 'https://myshowflix.herokuapp.com/';

@Injectable({
    providedIn: 'root'
})

export class FetchApiDataService {
    // Injects the HttpClient module to the constructor params
    // This provides HttpClient to the entire class, making it available via this.http
    constructor(private http: HttpClient) {
    }

  /**
   * extracts response data from HTTP response
   * @param res 
   * @returns response body or empty object
   */
    private extractResponseData(res: Object): any { // changed type Response to Object
        const body = res;
        return body || {};
    }

  /**
   * calls API endpoint to register a new user
   * @param userDetails 
   * @returns a new user object in JSON format
   */
    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + 'users', userDetails).pipe(
            catchError(this.handleError)
        );
    }

  /**
   * calls API endpoint to login an existing user
   * @param userDetails 
   * @returns data of the user in JSON format
   */
    public userLogin(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + 'login', userDetails).pipe(
            catchError(this.handleError)
        );
    }

  /**
   * calls API endpoint to get data on all movies
   * @returns array of all movies in JSON format
   */
    public getAllMovies(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies', {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

  /**
   * calls API endpoint to get data on a single movie specified by its title
   * @param title 
   * @returns JSON object holding movie data
   */
    getMovie(title: any): Observable<any> {
      // Get Authorization token stored in local storage
      const token = localStorage.getItem('token');
      return this.http
        .get(apiUrl + `movies/${title}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          })
        })
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

  /**
   * calls API endpoint to get data on a director
   * @param name 
   * @returns JSON obejct holding director data
   */
    getDirector(name: any): Observable<any> {
      // Get Authorization token stored in local storage
      const token = localStorage.getItem('token');
      return this.http
        .get(apiUrl + `movies/director/${name}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          })
        })
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

  /**
   * calls API endpoint to get data on a genre
   * @param name 
   * @returns JSON object holding genre data
   */

    getGenre(name: any): Observable<any> {
      // Get Authorization token stored in local storage
      const token = localStorage.getItem('token');
      return this.http
        .get(apiUrl + `movies/genre/${name}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          })
        })
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }
  

  /**
   * calls API endpoint to get data on a single user
   * @returns JSON object holding data about the requested user
   */
    getUser(): Observable<any> {
      // Get Authorization token stored in local storage
      const token = localStorage.getItem('token');
      // Get Username stored in local storage
      const username = localStorage.getItem('username');
      return this.http
        .get(apiUrl + `users/${username}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          })
        })
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

  /**
   * calls API endpoint to get list of favorite movies of this user
   * @returns list of the user's favorite movies in JSON format
   */
    getFavoriteMovies(): Observable<any> {
      // Get Authorization token stored in local storage
      const token = localStorage.getItem('token');
      // Get Username stored in local storage
      const username = localStorage.getItem('username');
      return this.http
        .get(apiUrl + `users/${username}/movies`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          })
        })
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

  /**
   * calls API endpoint to add a movie to the user's list of favorite movies
   * @param movieID 
   * @returns JSON object holding data about the updated user
   */
    addFavoriteMovie(movieID: string): Observable<any> {
      // Get Authorization token stored in local storage
      const token = localStorage.getItem('token');
      // Get Username stored in local storage
      const username = localStorage.getItem('username');
      return this.http
        .post(apiUrl + `users/${username}/movies/${movieID}`, null, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          })
        })
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

  /**
   * calls API endpoint to allow user to update their user information
   * @param userDetails 
   * @returns JSON object holding data about the updated user
   */
    editUser(userDetails: any): Observable<any> {
      // Get Authorization token stored in local storage
      const token = localStorage.getItem('token');
      // Get Username stored in local storage
      const username = localStorage.getItem('username');
      return this.http
        .put(apiUrl + `users/${username}`, userDetails, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          })
        })
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

  /**
   * calls API endpoint to deregister an existing user
   * @returns	A success message indicating that the profile was successfully deleted.
   */
    deleteUser(): Observable<any> {
      // Get Authorization token stored in local storage
      const token = localStorage.getItem('token');
      // Get Username stored in local storage
      const username = localStorage.getItem('username');
      return this.http
        .delete(apiUrl + `users/${username}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          })
        })
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

  /**
   * calls API endpoint to delete a movie from the user's list of favorite movies
   * @param movieID 
   * @returns JSON object holding data about the updated user
   */
     deleteFromFavorites(movieID: any): Observable<any> {
      // Get Authorization token stored in local storage
      const token = localStorage.getItem('token');
      // Get Username stored in local storage
      const username = localStorage.getItem('username');
      return this.http
        .delete(apiUrl + `users/${username}/movies/${movieID}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          })
        })
        .pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

  /**
   * handles errors
   * @param error 
   * @returns error message
   */
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error('Some error occurred:', error.error.message);
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                `Error body is: ${error.error}`);
        }
        return throwError(() => new Error(
            'Something bad happened; please try again later.'));
    }
}