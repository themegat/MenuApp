import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Outlet } from "../../../interfaces/outlet";
import * as $ from 'jquery'
/**
 * Generated class for the OutletDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-outlet-details',
  templateUrl: 'outlet-details.html',
})
export class OutletDetailsPage {
  private outlet_list: Outlet[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.outlet_list = navParams.get("outlets");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  expandParagraph(element) {
    $('.p_expandable').removeClass('expand_p');
    var currentElement = $('#p_' + element);
    currentElement.addClass('expand_p');
  }

  callNumber(numberToCall: string) {
    numberToCall = numberToCall.replace(/ /g, "");
    setTimeout(() => {
      let tel = numberToCall;
      window.open(`tel:${tel}`, '_system');
    }, 100);
  }
}
