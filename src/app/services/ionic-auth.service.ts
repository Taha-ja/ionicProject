import { Injectable ,NgZone} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { IonicToastService } from './ionic-toast.service';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { MenuController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class IonicAuthService {
  userData: any;
  sharedName:string;
  constructor(
    private angularFireAuth: AngularFireAuth,
    public afStore: AngularFirestore,
    public router: Router,
    public ngZone: NgZone,
    private menu: MenuController,
    private ionicToastService: IonicToastService,
    ) {
      this.angularFireAuth.authState.subscribe((user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      });
    
    
  }
  createUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  signinUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.angularFireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.ionicToastService.showToast('Password reset email has been sent, please check your inbox.');
        this.router.navigate(['login']);
      })
      .catch((error) => {
        this.ionicToastService.showToast(error)
      });
  }
  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.emailVerified !== false ? true : false;
  }
  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  // Auth providers
  AuthLogin(provider) {
    return this.angularFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Store user in localStorage
  SetUserData(user) {
    this.afStore.collection("/Users").doc().set({
      name:user.fullName,
      email:user.email
    });
  }
  // async getUserId(did:string){
  //   var user= (await this.angularFireAuth.currentUser);
  //   let email=( user).email;
  //   // let did;
  //   this.afStore.collection('/Users').snapshotChanges(['added']).subscribe(
  //     actions =>{
  //       actions.forEach(action=>{
  //       if(email== action.payload.doc.data()['email']){
  //         // this.name=action.payload.doc.data()['name'];
  //         did=action.payload.doc.id;
  //         console.log("did from aith:  "+did);
  //       }
  //     })
  //     }
  //   )
  // }
  // Sign-out
  SignOut() {
    return this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.menu.close();
      this.router.navigate(['login']);
    });
  }




  // signoutUser() {
  //   return new Promise<void>((resolve, reject) => {
  //     if (this.angularFireAuth.currentUser) {
  //       this.angularFireAuth.signOut()
  //         .then(() => {
  //           console.log("Sign out");
  //           resolve();
  //         }).catch(() => {
  //           reject();
  //         });
  //     }
  //   })
  // }

  // userDetails() {
  //   return this.angularFireAuth.user
  // }

}

