import { Component } from '@angular/core';
import { NavController, NavParams,  ModalController } from 'ionic-angular';
import { Menu } from 'ionic-angular/components/app/menu-interface';
import { HttpClient } from '@angular/common/http';
import {ItemDetailPage} from "../item-detail/item-detail";

@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html'
})
export class MenuPage {
    search_icon: any;
    private readonly RESTAURANT_LOGO = [{ name: "KFC", logoUrl: "../../assets/imgs/KFC_Logo.png" },
    { name: "McDonalds", logoUrl: "../../assets/imgs/Mcdonalds_logo.png" },
    { name: "NANDOS", logoUrl: "../../assets/imgs/376px-Nandos_logo.svg.png" },
    { name: "DEBONAIRS", logoUrl: "../../assets/imgs/Debonaires-logo.jpg" },
    { name: "STEERS", logoUrl: "../../assets/imgs/Steers_Logo.jpg" }]
    public menu_list: Menu[];
    private readonly url = "http://congos3.000webhostapp.com/menu.php?id=";

    constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private modalCtrl: ModalController) {
        var restaurantName = navParams.get('data');
       
        for (let restaurant of this.RESTAURANT_LOGO) {
            if (restaurantName == restaurant.name) {
                this.search_icon = restaurant.logoUrl;
                this.http.get(this.url + restaurant.name).subscribe(data => {
                    this.setMenuList(data);
                }, err => {
                    console.log("OOPS");
                    console.log(err);
                });
                break;
            }
        }
    }

    setMenuList(data) {
        this.menu_list = data;
    }

    openItemDetails(item:Menu){
        var modal = this.modalCtrl.create(ItemDetailPage, {menuItem:item});
        modal.present();
    }
}