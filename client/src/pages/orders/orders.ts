import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { OrderService } from './../../providers/order.service';

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  items: any = [];
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,

    public navParams: NavParams,
    public orderService: OrderService
  ) {

  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad OrdersPage', this.navParams.get('data'));
    this.items = [...this.navParams.get('data')];
    console.log('items', this.items);
  }

  onCloseModal () {
    this.viewCtrl.dismiss();
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
