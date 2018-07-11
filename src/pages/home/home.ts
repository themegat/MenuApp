import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dataMe: any;

  constructor(public navCtrl: NavController) {
  }

  openMenu(data) {
    this.navCtrl.push(MenuPage, {data:data});
  }
}
