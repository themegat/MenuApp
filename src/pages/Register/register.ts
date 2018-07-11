import { Component } from '@angular/core';
import { NavController, ToastController, ToastOptions } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'Register-home',
  templateUrl: 'register.html',
  
  
})
export class RegisterPage {



  Username:string;
  Password:string;
  Name:string;
  Email: string;
  Surname :string;
  toastOptions: ToastOptions;
  private readonly url = "http://congos3.000webhostapp.com/access.php?";

  constructor(public toast:ToastController,  public navCtrl: NavController, public http: HttpClient) {


    this.toastOptions ={

          message: 'Registered Successfully!',
          duration:3000,
          position: 'top'

    }

  }

  ionViewDidLoad(){
    
  console.log(' ionViewDidLoad RegisterPage ')

  }

 register(){

   
  var parameters = "name="+ "&surname=" + this.Surname +"&username=" +this.Username +"&email=" +this.Email +"&password="+ this.Password;
    this.http.get(this.url + parameters).subscribe(data => {
    console.log(data);
}, err => {
    console.log("OOPS");
    console.log(err);
});
  

this.toast.create(this.toastOptions).present();
  //  console.log("Name "+this.Name);
  //  console.log("Surname " + this.Surname);
  //  console.log("Username "+this.Username);
  //  console.log("Email" + this.Email);
  //  console.log("Password "+this.Password);
  //  if(this.Name!=undefined && this.Name!='' && this.Surname!=undefined && this.Surname!='' && this.Username!=undefined && this.Username!='' && this.Email!=undefined && this.Email!=''&&this.Password!=undefined &&this.Password!='' ){
  //   this.toast.create(this.toastOptions).present();
  //  } else {

    
  //    alert("Failed Registration");
  //  }



  var email = document.getElementById('txtEmail');
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!filter.test(this.Email)) {
  alert('Please provide a valid email address');
  
  return false;  

 }

 }
  



}

 
