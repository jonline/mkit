import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { ApiService } from './api.service';

@Injectable()
export class CartService {
  private cartItemsSource: Subject<any> = new BehaviorSubject([]);
  // private ticketsSource = new ReplaySubject<boolean>();
  cartItems$ = this.cartItemsSource.asObservable();
  _cartItems: any;

  constructor(
    private api: ApiService,
    private alertCtrl: AlertController
  ) {
    this.cartItems$.subscribe(data => this._cartItems = data);
  }


  addToCart (item, qty) {
    let _addedItems = this.getCartItems();

    const _cart = _addedItems.find(x => x.id == item.id);
    if (_cart) {
      _cart.quantity += qty;
    } else {
      _addedItems.push(Object.assign({}, item, { quantity: qty }))
    }
    this.cartItemsSource.next(_addedItems);
  }

  getCartItems () {
    return this._cartItems;
  }

  showAddToCartPopUp (item) {
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
        this.addToCart(item, +data.qty);
      }
    });
    alert.present();
  }

}
