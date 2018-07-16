import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../Register/register';
// import { ForgetPage } from '../ForgetPassword/forget';
import { HttpClient } from '@angular/common/http';
import { RestaurantsPage } from '../restaurants/restaurants';
import { CommonProvider } from '../../providers/common/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {
  username: string;
  password: string;
  private readonly url = "http://congos3.000webhostapp.com/access.php?name=&surname=&email";

  constructor(public navCtrl: NavController, public http: HttpClient, private commonProvider: CommonProvider) {
  }

  Login() {
    try {
      if(this.username == undefined || this.username.length < 3){
        // throw "Enter a valid username";
      }

      var parameters = "&username=" + this.username + "&password=" + this.password;

      this.http.get(this.url + parameters).subscribe(data => {
        if (data['result'] === "success") {
          this.password = "";
          this.navCtrl.push(RestaurantsPage);
        }else if (data['result'] === "failed") {
          this.commonProvider.showAlert(data['message'],"");
        }
      }, err => {
        this.commonProvider.showAlert("Request faild. Please check your connection", "Login");
      });
    } catch (ex) {
      this.commonProvider.showAlert(ex, "");
    }
  }

  goRegister() {
    this.navCtrl.push(RegisterPage);
  }


  // forget() {
  //   this.navCtrl.push(ForgetPage);
  // }

}


