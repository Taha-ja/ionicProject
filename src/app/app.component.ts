import { Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { formationInterface } from '../beans/formationInterface';
import { FormationsService } from './services/formations.service';
import { AlertController, MenuController } from '@ionic/angular';
import { IonicAuthService } from './services/ionic-auth.service';

import {myCourses} from "../beans/myCourses"

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  // [x: string]: any;
  listLang:formationInterface[];
  listFram:formationInterface[];
  listLib:formationInterface[];
  email:string;
  name:string;
  test:string;
  listForm:myCourses[];
  constructor(
    private menu: MenuController,
    private serviceFormation:FormationsService,
    private route:ActivatedRoute,
    private fireAuth:AngularFireAuth,
    private firestore:AngularFirestore,
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private alertController:AlertController
    ){
      this.listForm=this.serviceFormation.getFormation();
  }
  doRefresh(ev){
    console.log("call api to get data")
    setTimeout(()=>{
      this.listForm=this.serviceFormation.getFormation();
      console.log("api responded");
      ev.target.complete();
    },2000)
  }
  closeMenu() {
    this.menu.close();
  }
  async signOut(){
    let alert =await this.alertController.create({
      header:"Sign out",
      message:"Are you sure to sign out?",
      buttons:[
        {
          text:"No",
          role:"cancel",
        },
        {
          text:"Yes",
          handler:()=>{
            console.log("log out");
            this.ionicAuthService.SignOut();
          }
        }
      ]
    });
    await alert.present();
  }
  async getName(){
    var user= (await this.fireAuth.currentUser);
    if(user.email!=undefined){
    this.email=user.email;
    this.firestore.collection('/Users').snapshotChanges(['added']).subscribe(
      actions =>{
        actions.forEach(action=>{
        if(this.email== action.payload.doc.data()['email']){
          this.name=action.payload.doc.data()['name'];
          this.name=this.name[0].toUpperCase()+this.name.substring(1)
          console.log(this.name);
        }
      })
      }
    )
  }
  }
  ngOnInit(){
  
  }
}