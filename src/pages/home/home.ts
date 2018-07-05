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

  openMenu(dataE) {
    // console.log(data);
    // let dataMe = data;
    this.navCtrl.push(MenuPage, {data:dataE});
  }
}
