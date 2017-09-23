import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

import { ApiService } from './../app/shared/api.service';

@Injectable()
export class CategoryService {

  constructor(
    private api: ApiService
  ) {
    console.log('Hello CategoriesProvider Provider');
  }

  getCategories () {
    const observable = this.api.get('categories');

    return observable;
  }

}
