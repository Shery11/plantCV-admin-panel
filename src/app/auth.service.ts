import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


import {CookieService } from 'ngx-cookie';




@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  

  constructor(private firebaseAuth: AngularFireAuth,private router: Router, public cookie : CookieService) {
    this.user = firebaseAuth.authState;
  }

  signup(email: string, password: string) {
   


   return this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
     
  }

  login(email: string, password: string) {
    
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
    
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
      this.router.navigateByUrl('/login');

      this.cookie.removeAll();


  }

}
