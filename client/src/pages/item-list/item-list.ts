import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ItemListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemList {
  categories: any[] = [
    {
      id: 0,
      label: 'Appetizers'
    },
    {
      id: 1,
      label: 'Sides'
    },
    {
      id: 2,
      label: 'Desserts'
    },
    {
      id: 3,
      label: 'Main Courses'
    }
  ]
  items: any[] = [];
  selectedCategory = {};
  cartItems: any[] = [];

  appetizers = [
    {
      categoryId: 0,
      id: 1,
      name: 'Cretan Ntakos',
      tags: ['amet', 'adipiscing'],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae interdum ante. Quisque a augue elit. Sed id dolor id est scelerisque porttitor eget a ligula. Ut dapibus feugiat purus tempus maximus.',
      image: 'appetizers/cat-a-1-1.png',
      options: [
        {
          active: 1,
          label: 'Tomatoes'
        },
        {
          active: 1,
          label: 'Olives'
        },
        {
          active: 1,
          label: 'Oregano'
        }
      ],
      extras: [
        {
          active: 1,
          label: 'Cucumber',
          price: 1.20
        }
      ],
      prices: [
        {
          label: 'starndard',
          price: 8
        },
        {
          label: 'large',
          price: 12
        }
      ]
    },
    {
      categoryId: 0,
      id: 2,
      name: 'Golder Cauliflower',
      tags: ['ultrices', 'venenatis'],
      description: 'Donec et quam ultrices, maximus urna quis, elementum neque. Phasellus eu ultrices odio, in venenatis erat. Curabitur feugiat ut tellus non feugiat.',
      image: 'appetizers/cat-a-2-1.png',
      options: [
        {
          active: 1,
          label: 'Tomato sauce'
        }
      ],
      prices: [
        {
          label: 'starndard',
          price: 13
        }
      ]
    },
    {
      categoryId: 0,
      id: 3,
      name: 'Shrimp Rolls',
      tags: ['euismod', 'finibus', 'ornare'],
      description: 'Donec euismod mattis finibus. In finibus risus vitae tortor varius, eu ornare erat sodales. Nullam ut dignissim mauris.',
      image: 'appetizers/cat-a-3-1.png',
      options: [
        {
          active: 1,
          label: 'Celery'
        },
        {
          active: 1,
          label: 'Corn'
        },
        {
          active: 1,
          label: 'Butter'
        },
        {
          active: 1,
          label: 'Rice'
        }
      ],
      extras: [
        {
          active: 1,
          label: 'Mayonnaise',
          price: 2.10
        },
        {
          active: 1,
          label: 'Lemon sauce',
          price: 3.20
        }
      ],
      prices: [
        {
          label: 'Single',
          price: 6
        },
        {
          label: 'Double',
          price: 11
        }
      ]
    },
    {
      categoryId: 0,
      id: 4,
      name: 'Grilled Potatoes',
      tags: ['porttitor', 'lacinia'],
      description: 'Cras porttitor, metus a facilisis lacinia, dui tortor mollis quam, vitae laoreet lectus nulla nec dui. Donec congue ultricies dolor, non pharetra est rhoncus non. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed et purus orci.',
      image: 'appetizers/cat-a-4-1.png',
      options: [
        {
          active: 1,
          label: 'Spicy sauce'
        }
      ],
      extras: [
        {
          active: 1,
          label: 'Mustard',
          price: 2.00
        },
        {
          active: 1,
          label: 'Papprika sauce',
          price: 3.20
        },
        {
          active: 1,
          label: 'Hot red pepper flakes',
          price: 0.50
        }
      ],
      prices: [
        {
          label: 'Single',
          price: 101
        },
        {
          label: 'Double',
          price: 18
        }
      ]
    },
  ]
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad () {

    console.log('ionViewDidLoad ItemListPage');
    let categoryId = this.navParams.get('category');
    this.selectedCategory = this.categories.find(item => item.id === categoryId);
    this.items = this.appetizers;
  }

  onItemClickHandler (item) {
    this.navCtrl.push('ItemDetails', { data: item, category: this.selectedCategory });
  }
  addToCard (event, item) {
    event.stopPropagation();
    console.log('add to cart....', );
    this.showPrompt(item);
  }

  showPrompt (item) {
    let alert = this.alertCtrl.create();
    alert.setTitle(item.name);
    alert.setMessage('Quantity:');

    alert.addInput({
      type: 'number',
      name: 'qty',
      min: '1',
      value: "1"
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Add to cart',
      handler: data => {
        // console.log('OKKK', data[0]);
        // this.cartItems += +data[0];
        const _cart = this.cartItems.find(x => x.id == item.id);
        if (_cart) {
          _cart.quantity += +data[0];
          console.log('_cart', _cart);
        } else {
          this.cartItems.push(Object.assign({}, item, { quantity: +data[0] }))
        }
      }
    });
    alert.present();
  }

  onCartItemsClickHandler () {
    console.log('carts', this.cartItems);
  }
}
