import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
user: any ={}; 

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
   
  }

getUser(): void {
  this.fetchApiData.getUser().subscribe((resp:any)=> {
    this.user = resp;
    return this.user;
  })


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
