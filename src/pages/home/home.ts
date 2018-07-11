import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../Register/register';
// import { ForgetPage } from '../ForgetPassword/forget';
import { HttpClient } from '@angular/common/http';
import { RestaurantsPage } from '../restaurants/restaurants';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {
  username: string;
  password: string;
  private readonly url = "http://congos3.000webhostapp.com/access.php?name=&surname=&email";

  constructor(public navCtrl: NavController, public http: HttpClient) {
  }

  Login() {
    var parameters = "&username=" + this.username + "&password=" + this.password;
    this.http.get(this.url + parameters).subscribe(data => {
      if (data['result'] === "success") {
        this.navCtrl.push(RestaurantsPage);
      }
    }, err => {
      console.log("OOPS");
      console.log(err);
    });
  }

  // goRegister() {
  //   this.navCtrl.push(RegisterPage);
  // }


  // forget() {
  //   this.navCtrl.push(ForgetPage);
  // }

}


