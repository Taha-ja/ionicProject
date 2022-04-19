import { Component, OnInit } from '@angular/core';
import { GetCoursesService } from '../services/get-courses.service';
import { MenuController } from '@ionic/angular';
import { Observable, range } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IonicAuthService } from '../services/ionic-auth.service';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  number:number;
  constructor(private menu: MenuController,
    private gcs:GetCoursesService,
    private fireAuth:AngularFireAuth,
    private ionicAuthService: IonicAuthService,
    private appComp:AppComponent) { 
      this.items =this.gcs.getHomeCourses();
      this.number=Math.floor(Math.random()*10)+2;
      console.log(this.number)

    }
    items: Observable<any[]>[];
    shuffle(a:Observable<any[]>[]) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
          j = Math.round(Math.random() * (i + 1));
          x = a[i];
          a[i] = a[j];
          a[j] = x;
      }
      return a;
  }
getName(){
    this.appComp.getName();
}
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  closeMenu() {
    this.menu.close();
  }
  doRefresh(ev){
    console.log("call api to get data")
    setTimeout(()=>{
      this.items=this.shuffle(this.items);
      this.number=Math.floor(Math.random()*10)+4;
      console.log("api responded");
      console.log(this.number);
      ev.target.complete();
    },1000)
  }
  async ngOnInit(){
  console.log("name: "+(await this.fireAuth.currentUser).email);
  this.ionicAuthService.sharedName= (await this.fireAuth.currentUser).email;

}

}
