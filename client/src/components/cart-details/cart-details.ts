import { Component } from '@angular/core';

import { CartService } from './../../app/shared/cart.service';

@Component({
  selector: 'cart-details',
  templateUrl: 'cart-details.html'
})
export class CartDetailsComponent {

  text: string;

  items: any = [];

  constructor(
    public cartService: CartService
  ) {
  }

  ngOnInit () {
    this.items = [...this.cartService.getCartItems()];
  }

  onAddQty (item) {
    item.quantity += 1;
  }

  onRemoveQty (item) {
    item.quantity != 1 && (item.quantity -= 1);
  }

  onTrash (item) {

  }

}
