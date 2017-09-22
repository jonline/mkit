import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../app/shared/auth.service';
import { LoginPage } from '../login/login';
import { ItemList } from './../item-list/item-list';

// import { ApiService } from "../../app/shared/api.service";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  foodCategory = [
    {
      id: 1,
      name: 'Appetizers',
      items: 18,
      imageName: 'appetizer.jpg'
    },
    {
      id: 2,
      name: 'Sides',
      items: 15,
      imageName: 'sideitems.jpg'
    },
    {
      id: 3,
      name: 'Desserts',
      items: 12,
      imageName: 'dessert.jpg'
    },
    {
      id: 4,
      name: 'Main Course',
      items: 10,
      imageName: 'maincourse.jpg'
    }
  ]
  constructor(
    public navCtrl: NavController,
    // private api: ApiService,
    private auth: AuthService) {
  }

  logOut () {
    this.auth.logout();
    this.navCtrl.push(LoginPage);
  }
  onItemClickHandler (category) {
    // this.navCtrl.push('ItemList', { category: category });
    this.navCtrl.push(ItemList, { category: category });
  }
}
