import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { ApiService } from "../../app/shared/api.service";
import { AuthService } from "../../app/shared/auth.service";
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    // private api: ApiService,
    private auth: AuthService) {
  }

  logOut () {
    this.auth.logout();
    this.navCtrl.push(LoginPage);
  }
}
