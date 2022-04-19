import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IonicAuthService } from '../services/ionic-auth.service';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  did:string;
  email:string;
  test:string;
  constructor(
    public firestore: AngularFirestore,
    private fireAuth:AngularFireAuth,
    private route:ActivatedRoute,
    private ionicAuthService: IonicAuthService,) { 
    
  }
  items: Observable<any[]>;
  async ngOnInit() {
    // this.did=this.route.snapshot.paramMap.get("did");
    this.test=this.route.snapshot.paramMap.get("")

    var user= (await this.fireAuth.currentUser);
    this.email=(await user).email;
    this.firestore.collection('/Users').snapshotChanges(['added']).subscribe(
      actions =>{
        actions.forEach(action=>{
        if(this.email== action.payload.doc.data()['email']){
          this.items = this.firestore.collection("/Users/"+action.payload.doc.id+"/recap/").valueChanges();
        }
      })
      }
      
    )
  }

}
