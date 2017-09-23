import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CartService } from './../../app/shared/cart.service';
import { ItemService } from './../../providers/items.service';
import { ItemDetails } from './../item-details/item-details';

@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemList {
  items: any[] = [];
  selectedCategory = {};
  cartItems: any[] = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private itemService: ItemService,
    public cartService: CartService
  ) {
  }

  ionViewDidLoad () {
    let category = this.navParams.get('category');
    this.selectedCategory = category;
    this.itemService.getItems().subscribe(data => this.items = data);
  }

  onItemClickHandler (item) {
    this.navCtrl.push(ItemDetails, { data: item, category: this.selectedCategory });
  }
  addToCard (event, item) {
    event.stopPropagation();
    this.cartService.showAddToCartPopUp(item);
  }

  onCartItemsClickHandler () {
    console.log('carts', this.cartItems);
  }
}
