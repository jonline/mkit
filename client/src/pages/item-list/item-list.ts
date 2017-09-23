import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

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
    private alertCtrl: AlertController,
    private itemService: ItemService) {
  }

  ionViewDidLoad () {
    let category = this.navParams.get('category');
    // this.selectedCategory = this.categories.find(item => item.id === categoryId);
    this.selectedCategory = category;
    this.itemService.getItems().subscribe(data => this.items = data);
  }

  onItemClickHandler (item) {
    this.navCtrl.push(ItemDetails, { data: item, category: this.selectedCategory });
  }
  addToCard (event, item) {
    event.stopPropagation();
    console.log('add to cart....', );
    this.showPrompt(item);
  }

  showPrompt (item) {
    let alert = this.alertCtrl.create();
    alert.setTitle(item.name);
    alert.setMessage('Quantity:');

    alert.addInput({
      type: 'number',
      name: 'qty',
      min: '1',
      value: '1'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Add to cart',
      handler: data => {
        // console.log('OKKK', data[0]);
        // this.cartItems += +data[0];
        const _cart = this.cartItems.find(x => x.id == item.id);
        if (_cart) {
          _cart.quantity += +data[0];
          console.log('_cart', _cart);
        } else {
          this.cartItems.push(Object.assign({}, item, { quantity: +data[0] }))
        }
      }
    });
    alert.present();
  }

  onCartItemsClickHandler () {
    console.log('carts', this.cartItems);
  }
}
