import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {

  constructor(public http: HttpClient, public alertCtrl: AlertController) {
    // console.log('Hello CommonProvider Provider');
  }

  showAlert(message: string, title: string) {
    if (title === "" || title == undefined) {
      title = "Oops"
    }
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }
}
