import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ItemDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetails {
  category: any;
  item: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad () {
    console.log('ionViewDidLoad ItemDetailsPage');
    this.item = this.navParams.get('data');
    this.category = this.navParams.get('category');
  }

}
