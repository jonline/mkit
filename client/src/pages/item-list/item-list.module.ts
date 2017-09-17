import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemList } from './item-list';

@NgModule({
  declarations: [
    ItemList,
  ],
  imports: [
    IonicPageModule.forChild(ItemList),
  ],
})
export class ItemListPageModule { }
