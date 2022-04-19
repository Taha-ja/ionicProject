import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GetCoursesService } from '../services/get-courses.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.page.html',
  styleUrls: ['./formation.page.scss'],
})
export class FormationPage implements OnInit {
  param:string;
  constructor(
    public firestore: AngularFirestore,
    private route:ActivatedRoute,
    private gcs:GetCoursesService) { 
    
  }
  items: Observable<any[]>;


  ngOnInit() {
    this.param=this.route.snapshot.paramMap.get("formationName");
    this.items = this.gcs.getCourses(this.param);
  }
}
