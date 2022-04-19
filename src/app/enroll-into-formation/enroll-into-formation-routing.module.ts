import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnrollIntoFormationPage } from './enroll-into-formation.page';

const routes: Routes = [
  {
    path: '',
    component: EnrollIntoFormationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnrollIntoFormationPageRoutingModule {}
