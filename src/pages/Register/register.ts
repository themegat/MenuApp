import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { CommonProvider } from '../../providers/common/common';

@Component({
  selector: 'Register-home',
  templateUrl: 'register.html',
})
export class RegisterPage {

  Username: string;
  Password: string;
  Name: string;
  Email: string;
  Surname: string;
  private readonly url = "http://congos3.000webhostapp.com/access.php?";

  constructor(private commonProvider: CommonProvider, public navCtrl: NavController, public http: HttpClient) {
  }

  register() {

    try {
      if (this.Name == undefined || this.Name.length < 3) {
        throw "Enter a valid name";
      } else if (this.Surname == undefined || this.Surname.length < 3) {
        throw "Enter a valid surname";
      } else if (this.Username == undefined || this.Username.length < 3) {
        throw "Enter a username that is 3 to 15 characters long.";
      } else if (this.Email == undefined || this.Email.length < 3) {
        throw "Enter a valid email address";
      }

      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!filter.test(this.Email)) {
        throw "Enter a valid email address";
      }

      if (this.Password == undefined || this.Password.length < 5 || this.Password.length > 10) {
        throw "Enter a password that is 5 to 10 characters long";
      }

      var parameters = "name=" + "&surname=" + this.Surname + "&username=" + this.Username + "&email=" + this.Email + "&password=" + this.Password;
      this.http.get(this.url + parameters).subscribe(data => {
        if (data['result'] === "success") {
          this.commonProvider.showAlert("Your registration was successful. You will now be required to login.", "Thank you")
          this.navCtrl.pop();
        } else if (data['result'] === "failed") {
          this.commonProvider.showAlert(data['message'], "");
        }
      }, err => {
        this.commonProvider.showAlert("Request Failed. Please check your connection.", "Register");
      });
    } catch (err) {
      this.commonProvider.showAlert(err, "");
    }
  }




}


