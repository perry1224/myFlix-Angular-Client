import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

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

    /**
   * Gets user data from api call and sets the user variable to returned JSON file
   * @returns object holding user information
   * @function getUser
   */
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
   * opens the edit profile dialog from EditProfileComponent to allow user to edit their details
   */
openEditProfileDialog(): void {
  this.dialog.open(EditProfileComponent, {
    width: '300px'
  })
}

  /**
   * deletes the user profile, redirects to welcome screen
   * @function deleteProfile
   */
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

   /**
  * opens the user director dialog from DirectorComponent to displaying details
  * @param title
  * @param name
  * @param bio
  * @param birth
  */

openDirectorDialog(title: string, name: string, bio: string, birth: string): void {
  this.dialog.open(DirectorComponent, {
    data: {
      Title: title,
      Name: name,
      Bio: bio,
      Birthday: birth,
    },
    width: '500px',
    
  });
}


  /**
   * opens the dialog to display the SynopsisCarsComponent
   * @param title {string}
   * @param imagePath {any}
   * @param description {string}
   */
openSynopsis(title: string, imagePath: any, description: string): void {
  this.dialog.open(SynopsisComponent, {
    data: {
      Title: title,
      ImagePath: imagePath,
      Description: description,
    },
    width: '500px',
   
  });
}
  /**
  * opens the user genre dialog from GenreComponent to displaying details
  * @param name
  * @param description
  */
openGenreDialog(title: string, name: string, description: string): void {
  this.dialog.open(GenreComponent, {
    data: {
      Title: title,
      Name: name,
      Description: description,
    },
    width: '500px',
   
  });
  
}

  /**
   * deletes a user FavoriteMovie
   * @function deleteFavoriteMovies
   */
deleteFavoriteMovies(MovieID: string, Title: string): void {
  this.fetchApiData.deleteFromFavorites(MovieID).subscribe((res: any) => {
    this.snackBar.open(`Successfully removed ${Title} from favorite movies.`, 'OK', {
      duration: 4000, verticalPosition: 'top'
    });
    setTimeout(function () {
      window.location.reload();
    }, 4000);
  });
}
}
