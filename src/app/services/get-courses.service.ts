import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {cours} from '../../beans/cours';
import { FormationsService } from '../services/formations.service';
@Injectable({
  providedIn: 'root'
})
export class GetCoursesService{
  paths:cours[];
  items:Observable<any[]>;
  it:Observable<any[]>[]=[];
  path:string;
  constructor(
    public firestore: AngularFirestore,
    private serviceFormation:FormationsService,
    ) { 

      this.paths=this.serviceFormation.getPaths();
  }
getCourses(path:string){
  let selected;
  this.paths.forEach(p => {
    if(p.title===path){
      selected=p.path;
    }
  });
  return this.firestore.collection(selected).valueChanges();
}
getFormationById(id:string){
  this.paths.forEach(p=> {
    this.firestore.collection(p.path).valueChanges().
    forEach(e=>{
      e.forEach(a=>{
        if(a['id']==id){
          this.path=p.path;
          console.log("hello from grtFormationById()  :"+this.path);
          
          return this.path;
        }
      })
    })
  });
console.log("hello from grtFormationById()  :"+this.path);
return this.path
}
getpath(path:string){
  let selected:string;
  console.log(this.paths)
  this.paths.forEach(p => {
    if(p.title===path){
      selected=p.path;
    }
  })
  
  return selected;
}
getpathId(id:string){
  let iid =id;
  let selected:string;
  console.log(this.paths)
  this.paths.forEach(p => {
    console.log(iid.substring(0,iid.length-1))
    if(p.id==iid.substring(0,iid.length-1)){
      selected=p.path;
    }
  })
  
  return selected;
}
getHomeCourses(){
  this.serviceFormation.getFormation();
  console.log(this.serviceFormation.getPaths())
for(let i=0;i<this.paths.length;i++){
  this.it.push(this.firestore.collection(this.paths[i].path).valueChanges());
}
  return this.it;
}
}
