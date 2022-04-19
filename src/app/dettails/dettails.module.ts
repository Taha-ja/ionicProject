import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DettailsPageRoutingModule } from './dettails-routing.module';

import { DettailsPage } from './dettails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DettailsPageRoutingModule
  ],
  declarations: [DettailsPage]
})
export class DettailsPageModule {}
