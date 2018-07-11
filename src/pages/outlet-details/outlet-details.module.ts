import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutletDetailsPage } from './outlet-details';

@NgModule({
  declarations: [
    OutletDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OutletDetailsPage),
  ],
})
export class OutletDetailsPageModule {}
