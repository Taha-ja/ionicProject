import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../services/ionic-auth.service';
import {MenuController } from '@ionic/angular';
@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {

  email:string;

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private menu: MenuController,
  ) { }
  ionViewWillEnter() {

    this.menu.swipeGesture(false)
}

ionViewDidLeave() {

    this.menu.swipeGesture( false )
}
passwordRecover(value){
  this.ionicAuthService.PasswordRecover(value);

}
goToSignin(){
  this.router.navigate(["login"])
}
  ngOnInit() {

  }

}
