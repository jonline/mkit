import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, MenuController, NavController, NavParams } from 'ionic-angular';

import { ApiService } from '../../app/shared/api.service';
import { AuthService } from '../../app/shared/auth.service';
import { User } from '../../models/user.interface';
import { HomePage } from '../home/home';

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
    private auth: AuthService,
    private menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false, 'asideMenu');
  }

  ionViewDidLoad () {
    this.user.username = 'admin';
    this.user.password = 'Pt4bvZSSI4KN4g';
    this.checkTokenValidate();
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
        this.auth.token = data.token;
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

  checkTokenValidate () {
    // this.showLoader();

    this.auth.getToken().then((token) => {

      if (token != null && typeof (token) !== 'undefined') {
        this.showLoader();
        console.log("authenticating with token: ", token);

        // Attempt to hack token
        // Uncommenting this will attempt to modify the payload of a valid token with a userId of 57 to have a userId of 1 instead
        // Hint: it won't work
        // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ5NjYzOTU2Mn0=.JZKf2L3usAQWsC1plSPCRcHMoSST_3_BYtF6_-rVk80';
        this.auth.token = token;

        this.reauthenticate(token).map(res => res).subscribe((res) => {

          console.log(res);
          this.closeLoader();

          if (res.success) {
            this.navCtrl.setRoot(HomePage);
          }

        }, (err) => {
          console.log(err);
          this.closeLoader();
        });

      } else {
        // this.closeLoader();
      }

    });
  }

  reauthenticate (token) {
    let credentials = {
      token: token
    };

    return this.api.post('checkToken', JSON.stringify(credentials));
  }

}
