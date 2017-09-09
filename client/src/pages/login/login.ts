import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { HomePage } from "../home/home";
import { ApiService } from "../../app/shared/api.service";
import { AuthService } from "../../app/shared/auth.service";
import { User } from "../../models/user.interface";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;

  nextPage = HomePage;

  user = {} as User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private api: ApiService,
    private auth: AuthService, ) {
  }

  ionViewDidLoad () {
    this.user.username = 'admin';
    this.user.password = 'Pt4bvZSSI4KN4g';
  }

  login (user: User) {
    this.showLoader();

    const payload = {
      username: user.username,
      password: user.password
    };

    this.api.post('authenticate', payload)
      .subscribe(data => {
        this.closeLoader();
        this.auth.setToken(data.token);
        this.navCtrl.push(HomePage);
      },
      (err) => {
        this.closeLoader();
      });
  }

  wechatLogin () {
    this.auth.getToken().then(token => {
      console.log('token', token);
    });
  }

  showLoader () {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }

  closeLoader () {
    this.loading.dismiss();
  }

}
