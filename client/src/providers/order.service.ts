import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { ApiService } from './../app/shared/api.service';

@Injectable()
export class OrderService {

    constructor(
        private api: ApiService,
        public modalCtrl: ModalController
    ) {
    }

    // getCategories () {
    //     const observable = this.api.get('categories');

    //     return observable;
    // }

    showOrderModal (modalContentPage: any, data: any) {
        let modal = this.modalCtrl.create(modalContentPage, data);
        modal.present();
    }

}
