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
 

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }
ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

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


}