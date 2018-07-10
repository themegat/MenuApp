import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Menu } from 'ionic-angular/components/app/menu-interface';
import { HttpClient } from '@angular/common/http';
import { ItemDetailPage } from "../item-detail/item-detail";
import { LoadingController } from "ionic-angular";

@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html'
})
export class MenuPage {
    search_icon: any;
    private readonly RESTAURANT_LOGO = [{ name: "KFC", logoUrl: "assets/imgs/KFC_Logo.png" },
    { name: "McDonalds", logoUrl: "assets/imgs/Mcdonalds_logo.png" },
    { name: "NANDOS", logoUrl: "assets/imgs/376px-Nandos_logo.svg.png" },
    { name: "DEBONAIRS", logoUrl: "assets/imgs/Debonaires-logo.jpg" },
    { name: "STEERS", logoUrl: "assets/imgs/Steers_Logo.jpg" }]
    public menu_list: Menu[];
    private temp_menu_list;
    private readonly url = "http://congos3.000webhostapp.com/menu.php?id=";
    public loading;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private http: HttpClient, private modalCtrl: ModalController, public loadCtrl: LoadingController) {
        var restaurantName = navParams.get('data');

        this.loading = this.loadCtrl.create({ content: "Loading menu ,please wait..." });
        this.loading.present();

        for (let restaurant of this.RESTAURANT_LOGO) {
            if (restaurantName == restaurant.name) {
                this.search_icon = restaurant.logoUrl;
                this.http.get(this.url + restaurant.name).subscribe(data => {
                    this.setMenuList(data, this.loading);
                }, err => {
                    console.log("OOPS");
                    console.log(err);
                });
                break;
            }
        }
    }

    setMenuList(data, loader) {
        this.temp_menu_list = data;
        this.menu_list = this.temp_menu_list;
        setTimeout(function(){
            loader.dismiss();
        }, 5000);
    }

    filterMenuList(searchBar) {
        var filter = searchBar.target.value;

        if (filter !== "") {
            this.menu_list = [];
            for (let item of this.temp_menu_list) {
                if (item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
                    item.category.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
                    this.menu_list.push(item);
                }
            }
        } else {
            this.menu_list = this.temp_menu_list;
        }
    }

    resetMenuList() {
        this.menu_list = this.temp_menu_list;
    }

    openItemDetails(item: Menu) {
        var modal = this.modalCtrl.create(ItemDetailPage, { menuItem: item });
        modal.present();
    }
}