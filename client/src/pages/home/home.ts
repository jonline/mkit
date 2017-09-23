import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import { AuthService } from '../../app/shared/auth.service';
import { LoginPage } from '../login/login';
import { CategoryService } from './../../providers/categories.service';
import { ItemList } from './../item-list/item-list';

// import { ApiService } from "../../app/shared/api.service";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  foodCategory = [];

  constructor(
    public navCtrl: NavController,
    // private api: ApiService,
    private auth: AuthService,
    private categoryService: CategoryService) {
  }

  public ionViewDidLoad () {
    this.categoryService.getCategories().subscribe(data => {
      this.foodCategory = data;
    })
  }
  public ionViewWillEnter () {
    this.slides.slideTo(0, 1000);
    this.slides.startAutoplay();
  }

  logOut () {
    this.auth.logout();
    this.navCtrl.push(LoginPage);
  }
  onItemClickHandler (category) {
    this.navCtrl.push(ItemList, { category: category });
  }
}
