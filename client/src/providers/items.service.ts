import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { ApiService } from './../app/shared/api.service';

@Injectable()
export class ItemService {

  constructor(
    private api: ApiService) {
    console.log('Hello ItemsProvider Provider');
  }

  getItems () {
    const observable = this.api.get('items');

    return observable;
  }
}
