import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PouchdbProvider } from '../providers/pouchdb/pouchdb';

//import { Qrscanner  } from '../pages/qrscanner/qrscanner';
import { LoginPage  } from '../pages/login/login';
//import { MainPage  } from '../pages/main/main';
//import { ScansPage  } from '../pages/scan/scans';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, db : PouchdbProvider) {
    //db.configure();
    platform.ready().then(() => {
        //db.configure();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

