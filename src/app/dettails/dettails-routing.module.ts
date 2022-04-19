import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DettailsPage } from './dettails.page';

const routes: Routes = [
  {
    path: '',
    component: DettailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DettailsPageRoutingModule {}
