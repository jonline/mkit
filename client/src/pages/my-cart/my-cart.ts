import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CartService } from './../../app/shared/cart.service';

@Component({
  selector: 'page-my-cart',
  templateUrl: 'my-cart.html',
})
export class MyCartPage {
  items: any = [];

  constructor(
    public cartService: CartService,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad () {
    this.items = [...this.cartService.getCartItems()];
  }

  onAddQty (item) {
    item.quantity += 1;
  }

  onRemoveQty (item) {
    item.quantity != 1 && (item.quantity -= 1);
  }

  onTrash (item) {

  }

}
