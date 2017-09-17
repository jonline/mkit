import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetails } from './item-details';

@NgModule({
  declarations: [
    ItemDetails,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetails),
  ],
})
export class ItemDetailsPageModule { }
