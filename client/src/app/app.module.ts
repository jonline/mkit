import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CategoryService } from '../providers/categories.service';
import { ItemService } from '../providers/items.service';
import { CartDetailsComponent } from './../components/cart-details/cart-details';
import { ItemDetails } from './../pages/item-details/item-details';
import { ItemList } from './../pages/item-list/item-list';
import { MyCartPage } from './../pages/my-cart/my-cart';
import { OrdersPage } from './../pages/orders/orders';
import { OrderService } from './../providers/order.service';
import { MyApp } from './app.component';
import { ApiService } from './shared/api.service';
import { AuthService } from './shared/auth.service';
import { CartService } from './shared/cart.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ItemList,
    ItemDetails,
    OrdersPage,
    MyCartPage,
    CartDetailsComponent
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ItemList,
    ItemDetails,
    OrdersPage,
    MyCartPage,
    CartDetailsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiService,
    AuthService,
    CategoryService,
    ItemService,
    CartService,
    OrderService
  ]
})
export class AppModule { }
