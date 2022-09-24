import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];
 

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }
ngOnInit(): void {
  this.getMovies();
  this.getFavoriteMovies();
}

getFavoriteMovies(): void {
  this.fetchApiData.getUser().subscribe((resp: any) => {
    this.favoriteMovies = resp.FavoriteMovies;
    console.log(this.favoriteMovies);
    return this.favoriteMovies;
  });
}

  /**
   * Gets movies from api call and sets the movies state to return JSON file
   * @returns array holding movies objects
   * @function getAllMovies
   */
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

   /**
  * opens the user director dialog from DirectorComponent to displaying details
  * @param name
  * @param bio
  * @param birthday
  */

  openDirectorDialog(name: string, bio: string, birthday: Date): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
      },
      // Assign dialog width
      width: '500px'
    });
}

  /**
  * opens the user genre dialog from GenreComponent to displaying details
  * @param name
  * @param description
  */
openGenreDialog(name: string, description: string): void {
  this.dialog.open(GenreComponent, {
    data: {
      Name: name,
      Description: description,
    },
    // Assign dialog width
    width: '500px'
  });
}

  /**
   * opens the user synopsis dialog from SynopsisComponent to displaying details
   * @param title
   * @param description
   */
openSynopsisDialog(title: string, description: string): void {
  this.dialog.open(SynopsisComponent, {
    data: {
      Title: title,
      Description: description,
    },
    // Assign dialog width
    width: '500px'
  });

}

  /**
   * Gets favorite movies from api call and sets the favorite movies variable to return JSON file
   * @returns array holding ids of user's favorite movies
   * @function getFavoriteMovies
   */
addFavoriteMovie(id: string): void {
  console.log(id);
  this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
    console.log(result);
    this.ngOnInit();
  })
}
/**
 * removes a movie from the list of favorite movies via an API call
 * @param id 
 * @function removeFavoriteMovie
 */
 deleteFromFavorites(id: string): void {
  console.log(id);
  this.fetchApiData.deleteFromFavorites(id).subscribe((result) => {
    console.log(result);
    this.ngOnInit();
  })
}

  /**
   * checks if a movie is included in the user's list of favorite movies
   * @param id 
   * @returns true, if the movie is a favorite move, else false
   */
isFav(id: string): boolean {
  return this.favoriteMovies.includes(id)
}

}