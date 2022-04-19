import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnrollIntoFormationPageRoutingModule } from './enroll-into-formation-routing.module';

import { EnrollIntoFormationPage } from './enroll-into-formation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnrollIntoFormationPageRoutingModule
  ],
  declarations: [EnrollIntoFormationPage]
})
export class EnrollIntoFormationPageModule {}
