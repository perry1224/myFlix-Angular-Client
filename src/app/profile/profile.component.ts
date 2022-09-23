import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { EditProfileComponent } from '../edit-profile/edit-profile.component';

type Movie=    {
  "Genre": {
      "Name": string,
      "Description": string
  },
  "Director": {
      "Name": string,
      "DOB": string,
      "BIO": string,
  },

  "_id": string,
  "Title": string,
  "Year": string,
  "ImagePath": string,
  "Featured": boolean,
  "Description":string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  user: any ={}; 

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getMovies();
  }

getUser(): void {
  this.fetchApiData.getUser().subscribe((user:any)=> {
    this.user = user;
    this.fetchApiData.getAllMovies().subscribe((movies:Array<Movie>)=> {
      this.favoriteMovies = movies.filter(m => {
      return  user.FavoriteMovies.includes(m._id) 
       
       })
       console.log(this.favoriteMovies)
    })
    return this.user;
  })
  
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

openEditProfileDialog(): void {
  this.dialog.open(EditProfileComponent, {
    width: '300px'
  })
}
deleteProfile(): void {
  if (confirm('Are you sure you want to delete your account? This cannnot be undone.')) {
    this.router.navigate(['welcome']).then(() => {
      this.snackBar.open('You have successfully deleted your account!', 'OK', {
        duration: 2000
      });
    })
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log(result);
      localStorage.clear();
    });
  }
}
}
