import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { OutletDetailsPage } from '../pages/outlet-details/outlet-details';
import { RestaurantsPage} from '../pages/restaurants/restaurants';
import { RegisterPage} from '../pages/Register/register';
import { CommonProvider } from '../providers/common/common';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    ItemDetailPage,
    OutletDetailsPage,
    RestaurantsPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    ItemDetailPage,
    OutletDetailsPage,
    RestaurantsPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CommonProvider
  ]
})
export class AppModule { }
