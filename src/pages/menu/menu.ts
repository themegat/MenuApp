import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html'
})
export class MenuPage {
    search_icon: any;
    menu_list: any;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.search_icon = navParams.get('data');
        this.menu_list = [{
            name: "Brekkie Crunch Wrap",
            desc: "A delicious spicy mini fillet (Crunch fillet) egg and cheese with grilled tomato sauce all wrapped up in a mini tortilla. Only available at selected KFC breakfast stores from 6am – 10:30am.",
            price: "R 26,90"
        },
        {
            name: "Small Chips",
            desc: "A small portion of chips, crispy on the outside, soft and fluffy on the inside.",
            price: "R 7,90"
        },
        {
            name: "Coleslaw Regular",
            desc: "A regular portion of freshly prepared cabbage onions and carrots in a delicious dressing.",
            price: "R 14,90"
        },
        {
            name: "Boxmaster Original",
            desc: "No description",
            price: "R 49,90"
        },
        {
            name: "Mash Gravy Large",
            desc: "A large portion of mash and delicious gravy.",
            price: "R 14,90"
        }]
    }

}