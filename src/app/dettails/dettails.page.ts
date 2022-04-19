import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormationsService } from '../services/formations.service';
import {GetCoursesService} from '../services/get-courses.service';
import {cours} from '../../beans/cours';
import { __await } from 'tslib';
import { IonicAuthService } from '../services/ionic-auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dettails',
  templateUrl: './dettails.page.html',
  styleUrls: ['./dettails.page.scss'],
})
export class DettailsPage implements OnInit {
  param:string;
  items: Observable<any[]>;
  arr:string[];
  title:string;
  description:string;
  time:string;
  price:string;
  image:string;
  docId:string;
  pathToFormation:string;
  id:string;
  pid:string;
  select: string;
  paths:cours[];
  path:string;
  uid:string;
  buttonString:string="rejoindre nous";
  isExist:boolean=false;
  constructor(
    private route:ActivatedRoute,
    private firestore:AngularFirestore,
    private gcs:GetCoursesService,
    private serviceFormation:FormationsService,
    private ionicAuthService: IonicAuthService,
    private angularFireAuth: AngularFireAuth,
  ) { 



  }
  getFormationById(id:string){
    this.paths.forEach(p=> {
      this.firestore.collection(p.path).valueChanges().
      forEach(e=>{
        e.forEach(a=>{
          if(a['id']==id){
            this.param=p.title;
            console.log("hello from grtFormationById()  :"+this.param);
            
          }
        })
      })

    });
    return this.param;
  }

  async ngOnInit() {
    this.paths=this.serviceFormation.getPaths();
    console.log(this.paths)
    this.param=this.route.snapshot.paramMap.get("item");
    console.log("param:  "+this.param);
    this.pid=this.route.snapshot.paramMap.get("id");
    console.log("pid:  "+this.pid);
    if(this.param==null ||this.param==undefined ||this.param==""){
      this.pid=this.route.snapshot.paramMap.get("id");
      console.log("param1:  "+this.getFormationById(this.pid));
      this.select=this.gcs.getpathId(this.pid);
      console.log("select:  "+this.path);

  }
    else{
      console.log("param2:  "+this.param);
      this.select=this.gcs.getpath(this.param);
    }
    var docs=this.firestore.collection(this.select).valueChanges();
    docs.forEach(e=>{
      e.forEach(a=>{
        if(a['id']==this.pid){
          this.arr=a['axes'];
          this.title=a['title'];
          this.description=a['description'];
          this.time=a['time'];
          this.price=a['price'];
          this.image=a['image'];
          this.id=a['id'];
        }
      })
    })
    var user= (await this.angularFireAuth.currentUser);
    let email=(await user).email;
    this.firestore.collection('/Users').snapshotChanges(['added']).subscribe(
      actions =>{
        actions.forEach(action=>{
        if(email== action.payload.doc.data()['email']){
          this.uid=action.payload.doc.id;
          console.log("did from aith:  "+this.uid);
          this.firestore.collection('/Users/'+this.uid+'/recap/').valueChanges().forEach(item=>{
            console.log("item ::: "+item)
            item.forEach(i=>{
              console.log("pid a: "+this.pid);
              if(this.pid==i['id']){
                this.buttonString="Vous etes déja inscrits";
                this.isExist=true;
              }})
              
      
          });
        }
      })
      }
    )
  }

  
}
