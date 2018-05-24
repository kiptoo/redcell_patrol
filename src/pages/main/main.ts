import { Component,ViewChild  } from '@angular/core';
import { NavController,NavParams,Navbar } from 'ionic-angular';
import { LoginPage  } from '../login/login';
import { ScansPage  } from '../scan/scans';
import { QrscannerPage  } from '../qrscanner/qrscanner';
import { PouchdbProvider } from '../../providers/pouchdb/pouchdb';
import { Scan} from '../../models/scan.model';
import { Stop} from '../../models/stop.model';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
   @ViewChild(Navbar) navBar: Navbar;
name: string ;
sitename: string ;
siteid: string ;
empid: string ;
last_scan: string ;


  constructor(public navParams: NavParams,public navCtrl: NavController,private db :PouchdbProvider) {

  this.name=this.navParams.get('name');
  this.siteid=this.navParams.get('assignment');
  this.empid=this.navParams.get('id');
  this.sitename=this.navParams.get('site');
  //this.last_scan=this.navParams.get('name');
//console.debug(this.navParams.get('name'));


  }

   ionViewDidLoad() {
    this.navBar.backButtonClick = (e:UIEvent)=>{

    let data={
  assignment:this.siteid,
  site:this.sitename,
  name:this.name,
  id:this.empid

}
          this.navCtrl.push(MainPage,data);
    }
    //this.db.info();
   }

  scan(){
  let data={
  assignment:this.siteid,
  site:this.sitename,
  name:this.name,
  empid:this.empid

}
 this.navCtrl.push(QrscannerPage,data);
  }
      prev_scan(){
  //	this.nav.setRoot(MainPage);
  let data={
  assignment:this.siteid,
  site:this.sitename,
  name:this.name,
  empid:this.empid

}
  this.navCtrl.push(ScansPage,data);
  }
      logout(){
  //	this.nav.setRoot(MainPage);
  this.navCtrl.push(LoginPage);
  }

}
