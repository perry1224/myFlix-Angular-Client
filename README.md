# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Description
The aim of this project is to  build the client-side for a movie application called myFlix using Angular based on its existing server-side code (REST API and database), with supporting documentation.

### User Stories
* Users will be able view information on movies, directors, and genres so that they can learn more about movies
* Users will to be able to create a profile, edit profile as well as add or remove their favorite movies

### Key Features
* Welcome view where users are able to either log in or register an account
* Upon authentication, display a view of all Movies
* Upon clicking on a particular movie, users will be taken to a single movie view, where
additional movie details will be displayed. The single movie view will contain the following additional features:
  * A button that when clicked takes a user to the director view, where details about the director of that particular movie will be displayed.
  * A button that when clicked takes a user to the genre view, where details about that particular genre of the movie will be displayed.


### What technology did I use and why?

I chose to create the application using **Angular** along with **TypeScript** due to the following considerations:

I use **Angular Material** to style the UI of my application to make it responsive and take advantage of the ready to use components, such as mat cards.

### What challenges did I face, what did I learn?
* The purpose of 'Injecting' and how to use it and the importance of it when needing to transfer components to another file.
* Understanding the difference between SCSS and mat-material usages in html
* Understanding the use of SnackBar and when would it be appropriate to apply it such as when a user successfully logs in.

