import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-enroll-into-formation',
  templateUrl: './enroll-into-formation.page.html',
  styleUrls: ['./enroll-into-formation.page.scss'],
})
export class EnrollIntoFormationPage implements OnInit {
  title:string;
  email:string;
  name:string;
  did:string;
  id:string;
  image:string;
  isChecked:boolean=false;
  temp:number;
  a:boolean;
  items:Observable<any[]>;

  constructor(
    private route:ActivatedRoute,
    private firestore:AngularFirestore,
    private fireAuth:AngularFireAuth,
  ) { 
  }
  addToRecap(){

    this.items=this.firestore.collection('/Users/'+this.did+'/recap/').valueChanges();
    this.items.forEach(item=>{
      this.temp=item.length;
      if(item.length==0){
        console.log("tr:"+this.temp);
        this.firestore.collection("/Users/"+this.did+"/recap/").doc().set({
          id:this.id,
          image:this.image,
          title:this.title,
          
        });
      }else{
        item.forEach(i=>{
          if(this.id!=i['id']){
            this.temp=this.temp-1;
          }
          if(this.temp==0 || this.temp==undefined || item.length==0){
            this.firestore.collection("/Users/"+this.did+"/recap/").doc().set({
              id:this.id,
              image:this.image,
              title:this.title,
              
            });
          }
        })
      }

    })
  }
  checked(){
    this.a=!this.isChecked;
    this.isChecked=this.a;
  }
  
  async ngOnInit() {
    this.temp=1;
    this.title=this.route.snapshot.paramMap.get("title");
    this.image=this.route.snapshot.paramMap.get("image")
    this.id=this.route.snapshot.paramMap.get("id")
    var user= (await this.fireAuth.currentUser);
    this.email=(await user).email;
    console.log(this.email)
    this.firestore.collection('/Users').snapshotChanges(['added']).subscribe(
      actions =>{
        actions.forEach(action=>{
        if(this.email== action.payload.doc.data()['email']){
          this.name=action.payload.doc.data()['name'];
          this.did=action.payload.doc.id;
        }
      })
      }
    )

  }

}
