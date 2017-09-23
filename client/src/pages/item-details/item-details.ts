import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CartService } from './../../app/shared/cart.service';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetails {
  category: any;
  item: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService
  ) {
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad ItemDetailsPage');
    this.item = this.navParams.get('data');
    this.category = this.navParams.get('category');
  }

  onAddCartClickHandler () {
    this.cartService.showAddToCartPopUp(this.item)
  }
}
