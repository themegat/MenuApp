import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Menu } from 'ionic-angular/components/app/menu-interface';
import { HttpClient } from '@angular/common/http';
import { ItemDetailPage } from "../item-detail/item-detail";
import { LoadingController } from "ionic-angular";
import { Outlet } from '../../../interfaces/outlet';
import { OutletDetailsPage } from '../outlet-details/outlet-details';
import { CommonProvider } from '../../providers/common/common';
// import * as $ from 'jquery';

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
    { name: "STEERS", logoUrl: "assets/imgs/Steers_Logo.jpg" },
    { name: "MYTHOS", logoUrl: "assets/imgs/mythos_logo.png" },
    { name: "LUPA", logoUrl: "assets/imgs/Lupa.jpg" },
    { name: "Piza_e_Vino", logoUrl: "assets/imgs/Piza_e_Vino__logo.png" }]
    public menu_list: Menu[];
    private temp_menu_list;
    private readonly url = "http://congos3.000webhostapp.com/menu.php?id=";
    public loading;
    private outlet_list: Outlet[];
    public imgLoadCount: number = 0;
    private IMAGES_TO_LOAD;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private http: HttpClient, private modalCtrl: ModalController, public loadCtrl: LoadingController,
        private commonProvider: CommonProvider) {
        var restaurantName = navParams.get('data');

        this.showLoader();

        for (let restaurant of this.RESTAURANT_LOGO) {
            if (restaurantName == restaurant.name) {
                this.search_icon = restaurant.logoUrl;
                if (sessionStorage.getItem(restaurantName) != null) {
                    this.setDataLists(JSON.parse(sessionStorage.getItem(restaurantName)), this.loading);
                } else {
                    this.http.get(this.url + restaurant.name).subscribe(data => {
                        sessionStorage.setItem(restaurantName, JSON.stringify(data));
                        this.setDataLists(data, this.loading);
                    }, err => {
                        this.loading.dismiss();
                        this.commonProvider.showAlert("Request faild. Please check your connection", "");
                    });
                }
                break;
            }
        }
    }

    // onScroll(event) {
    //     var dd = $('.lazy')['src'];
    //     // if (dd != undefined) {
    //     //     if (dd.offset().top < 50) {
    //     //         dd.removeClass('lazy');
    //     //     }
    //     // }
    //     console.log("scollinh");
    //     console.log(dd);
    // }

    // setLazyLoad() {
    //     console.log("Not");
    //     console.log($('#btnOrder'));
    //     $(window).scroll(function () {
    //         console.log('scrolling');
    //     })
    //     // ("DOMContentLoaded", function () {
    //     //     var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    //     //     if ("IntersectionObserver" in window) {
    //     //         console.log("Is available");
    //     //         let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
    //     //             entries.forEach(function (entry) {
    //     //                 if (entry.isIntersecting) {
    //     //                     console.log("in view");
    //     //                     let lazyImage: any = entry.target;
    //     //                     lazyImage.src = lazyImage.dataset.src;
    //     //                     // lazyImage.srcset = lazyImage.dataset.srcset;
    //     //                     lazyImage.classList.remove("lazy");
    //     //                     lazyImageObserver.unobserve(lazyImage);
    //     //                 }
    //     //             });
    //     //         });

    //     //         lazyImages.forEach(function (lazyImage) {
    //     //             lazyImageObserver.observe(lazyImage);
    //     //         });
    //     //     }else{
    //     //         console.log("Not available");
    //     //     }
    //     // });

    // }

    setDataLists(data, loader) {
        this.IMAGES_TO_LOAD = data[0].menu.length;
        this.outlet_list = data[0].outlets;
        this.temp_menu_list = data[0].menu;
        this.menu_list = this.temp_menu_list;

    }

    showLoader() {
        this.loading = this.loadCtrl.create({ content: "Loading menu ,please wait..." });
        this.loading.present();
    }

    notifyLoader() {
        this.imgLoadCount++;

        if (this.imgLoadCount >= (this.IMAGES_TO_LOAD - 10)) {
            if (this.loading) {
                this.loading.dismiss();
                this.loading = null;
            }
        }
    }

    filterMenuList(searchBar) {
        var filter = searchBar.target.value;
        var arFilter = filter.split(" ");
        console.log(arFilter);
        if (arFilter.length > 0 && arFilter[0] !== "") {
            this.menu_list = [];
            for (let f of arFilter) {
                if (f !== "") {
                    for (let item of this.temp_menu_list) {
                        if (item.name.toLowerCase().indexOf(f.toLowerCase()) > -1 ||
                            item.category.toLowerCase().indexOf(f.toLowerCase()) > -1 ||
                            item.description.toLowerCase().indexOf(f.toLowerCase()) > -1) {
                            this.menu_list.push(item);
                        }
                    }
                }
            }
        } else {
            this.menu_list = this.temp_menu_list;
        }
        // if (filter !== "") {
        // this.menu_list = [];
        // for (let item of this.temp_menu_list) {
        //     if (item.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
        //         item.category.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
        //         this.menu_list.push(item);
        //     }
        // }
        // } else {
        //     this.menu_list = this.temp_menu_list;
        // }
    }

    resetMenuList() {
        this.menu_list = this.temp_menu_list;
    }

    openItemDetails(item: Menu) {
        var modal = this.modalCtrl.create(ItemDetailPage, { menuItem: item });
        modal.present();
    }

    openOutletDetails() {
        var modal = this.modalCtrl.create(OutletDetailsPage, { outlets: this.outlet_list });
        modal.present();
    }
}