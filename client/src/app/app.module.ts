import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ItemDetails } from './../pages/item-details/item-details';
import { ItemList } from './../pages/item-list/item-list';
import { MyApp } from './app.component';
import { ApiService } from './shared/api.service';
import { AuthService } from './shared/auth.service';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ItemList,
    ItemDetails
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
    ItemDetails
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiService,
    AuthService
  ]
})
export class AppModule { }
