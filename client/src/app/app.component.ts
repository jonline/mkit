import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { App, MenuController, Nav, Platform } from 'ionic-angular';

import { HomePage } from './../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { MyCartPage } from './../pages/my-cart/my-cart';
import { AuthService } from './shared/auth.service';
import { CartService } from './shared/cart.service';

// import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html',
  providers: []
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any, icon: any }>;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    // private api: ApiService,
    private auth: AuthService,
    private app: App,
    private cartService: CartService
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      // { title: 'List', component: ItemList, icon: 'list-box' },
      { title: 'My Carts', component: MyCartPage, icon: 'cart' },
      { title: 'Log Out', component: LoginPage, icon: 'log-out' },
    ];
  }

  initializeApp () {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // this.menuCtrl.swipeEnable(false, 'sideBar');
      this.menuCtrl.enable(false, 'asideMenu');
    });
  }

  openPage (page) {
    if (page.component == LoginPage) {
      this.auth.logout();
      this.cartService._cartItems = [];
      this.app.getActiveNav().push(LoginPage);
      return;
    }
    this.nav.setRoot(page.component);
  }

}

