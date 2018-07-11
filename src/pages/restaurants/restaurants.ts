import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-restaurants',
  templateUrl: 'restaurants.html',
})
export class RestaurantsPage {

  dataMe: any;

  constructor(public navCtrl: NavController) {
  }

  openMenu(data) {
    this.navCtrl.push(MenuPage, {data:data});
  }
}

