import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//import { ZBar } from '@ionic-native/zbar';
import { MyApp } from './app.component';
import { QRScanner} from '@ionic-native/qr-scanner';
import { LoginPage  } from '../pages/login/login';
import { MainPage  } from '../pages/main/main';
import { ScansPage  } from '../pages/scan/scans';
import { QrscannerPage  } from '../pages/qrscanner/qrscanner';
import { Toast } from '@ionic-native/toast';
import { PouchdbProvider } from '../providers/pouchdb/pouchdb';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ScanProvider } from '../providers/scan/scan';
import { StopProvider } from '../providers/stop/stop';
import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
     LoginPage,
     MainPage,
     ScansPage ,
     QrscannerPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MainPage,
    ScansPage ,
    QrscannerPage 

  ],
  providers: [
    StatusBar,
    QRScanner,
    Geolocation,
    Toast,
    //ZBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PouchdbProvider,
    ScanProvider,
    StopProvider,
    HttpClientModule

  ]
})
export class AppModule {}
