import { Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import {myCourses} from "../../beans/myCourses"
import {cours} from '../../beans/cours'
@Injectable({
  providedIn: 'root'
})
export class FormationsService{
  categories: string[]=[]; 
  cour:string[][]=[];
  cours:myCourses[]=[];
  test: any;
  constructor(public firestore: AngularFirestore,
    private route:ActivatedRoute) {
      this.fetchData();
      
  }
  fetchData(){
    this.firestore.collection('/Formations').snapshotChanges(['added']).subscribe(
      actions =>{
        actions.forEach(action=>{
          this.cours.push({categorie:action.payload.doc.data()['categorie'],icon:action.payload.doc.data()['icon'],cours:action.payload.doc.data()['cours']})
      })
      }   
    )
    console.log("hello from fetshData")
    return this.cours
  }
    getFormation(){
      console.log("hello from getFormation")
      return this.cours
    }
    getPaths(){
      let paths:cours[]=[];
      
      this.cours.forEach(b=>{
        b.cours.forEach(a=>{
          if(b.categorie=="Languages"){
            paths.push({title:a['url'].substring(10),path:"/Formations/Frameworks/"+a['url'].substring(10),id:a["id"]})
          }
          else if(b.categorie=="Frameworks"){
            paths.push({title:a['url'].substring(10),path:"/Formations/Languages/"+a['url'].substring(10),id:a["id"]})
          }else{
          paths.push({title:a['url'].substring(10),path:"/Formations/"+b.categorie+"/"+a['url'].substring(10),id:a["id"]})
          }
        
        })
      })
      return paths;
    }
}
