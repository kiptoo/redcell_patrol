import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import { PouchdbProvider } from '../../providers/pouchdb/pouchdb';
import { Scan} from '../../models/scan.model';
import { Stop} from '../../models/stop.model';
@Component({
  selector: 'page-scans',
  templateUrl: 'scans.html'
})
export class ScansPage {

	 Scans :any;
  siteid: string ;
  empid: string ;

  constructor(public navParams: NavParams,public navCtrl: NavController,private data :PouchdbProvider) {
this.siteid=this.navParams.get('assignment');
   this.empid=this.navParams.get('empid');
//alert("yes");
this.load();
  	     

  }

 ionViewDidLoad() {
this.load();


   }
   load(): void{
   // alert("yes 2");
    console.debug(this.siteid)
     this.data.getscans_byemployee(this.empid).then(
      (scan: Scan[]): void => {
     
     this.Scans = scan;
    // this.Scans.push(scan);
     console.debug(this.Scans)

  

      }); 
   }


}
