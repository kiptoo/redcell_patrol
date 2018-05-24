import { Component,ViewChild} from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { NavController,Navbar, Platform ,NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Toast } from '@ionic-native/toast';
import { MainPage  } from '../main/main';
import { PouchdbProvider } from '../../providers/pouchdb/pouchdb';
import { Stop} from '../../models/stop.model';
import { Scan} from '../../models/scan.model';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-qrscannerPage',
  templateUrl: 'qrscannerPage.html'
})
export class QrscannerPage {
    @ViewChild(Navbar) navBar: Navbar;
   lighting: boolean ;
  stops:any;
   public scanSub; 
   siteid: string ;
   name: string ;
   sitename: string ;
   empid: string ;
   location: any;
  gmLocation: {lat: number, lng: number} = {lat: 0, lng: 0};

  

  constructor(public navCtrl: NavController,public navParams: NavParams,private geoloc : Geolocation,private qrScanner: QRScanner,public toast :Toast,public plt: Platform,private data :PouchdbProvider) {
 this.siteid=this.navParams.get('assignment');
  this.name=this.navParams.get('name');
  this.sitename=this.navParams.get('site');
    this.empid=this.navParams.get('empid');

  }

    ionViewDidLoad() {

       this.scan();
    this.navBar.backButtonClick = (e:UIEvent)=>{
        let data={
  assignment:this.siteid,
  site:this.sitename,
  name:this.name,
  id:this.empid

}
     // todo something
     //this.navController.pop();
     //alert("yes");
        this.qrScanner.hide(); // hide camera preview
         this.hideCamera() 
          this.qrScanner.disableLight();
        // this.scanSub.unsubscribe(); // stop scanning
          this.navCtrl.push(MainPage,data);
    }

    this.plt.registerBackButtonAction(function () {
        let data={
  assignment:this.siteid,
  site:this.sitename,
  name:this.name,
  id:this.empid

}
          this.qrScanner.hide(); // hide camera preview
         this.hideCamera() 
          this.qrScanner.disableLight();
        // this.scanSub.unsubscribe(); // stop scanning
          this.navCtrl.push(MainPage,data);
    }, 1);

    this.data.getstops().then(
      (scan: Stop[]): void => {

     this.stops = scan;



      }); 

 

  }

scan(){

this.onLocateUser(); 
 
/*        let dbase= this.data.getDocuments().then(
      (stops: any): void => {

        console.debug(stops.rows.length);
        alert(stops.rows.length)
        
                this.toast.show(stops.rows.length, '5000', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      }
                    );
});*/
//this.verify('0f6e7c86e577225efe61c8a9a0001298');


this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted

        let scanSub = this.qrScanner.scan().subscribe((text: string) => {

               // alert("scan was succesful");
        /*this.toast.show(text, '5000', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      }
                    );*/

        //  this.verify(text);

  this.data.getstop_byid(text).then(
      (stops: Stop[]): void => {

        console.debug(stops[0].name);
        //alert(stops.length);
   
     if(stops.length>0){

      //alert("scan was succesful");
     
      let scan :Scan;
       scan={
       id: "",
       assignment:this.siteid,
      tourstop:{
       stopname: stops[0].name,
       stopid :text
     },
       employee:{
  employeename:this.name,
  employeeid:this.empid
  },
       stop :text,
       type:"scans",
       date: new Date(),
       time: (new Date()).getTime(),
      long:this.gmLocation.lng,
       lat: this.gmLocation.lat
        
      }
     // alert(scan.type+","+scan.stop);
         // scan.type="scans"
          //scan.stop=text;
        // console.debug(scan)

  this.data.addscan(scan).then(
      (promise: any): void => {

       // alert(promise);
       if (promise){
             //alert("successful scan");


           
        this.toast.show("successfully scanned", '5000', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      }
                    );

}
        let data={
  assignment:this.siteid,
  site:this.sitename,
  name:this.name,
  id:this.empid
}

         this.qrScanner.hide(); // hide camera preview
         this.hideCamera(); 
          this.qrScanner.disableLight();
          scanSub.unsubscribe(); // stop scanning
          this.navCtrl.push(MainPage,data);

      });



    }
    else
    {
         // alert("try again");
        this.toast.show("try again", '5000', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      }
                    );
        let data={
  assignment:this.siteid,
  site:this.sitename,
  name:this.name,
    id:this.empid
}

         this.qrScanner.hide(); // hide camera preview
         this.hideCamera(); 
          this.qrScanner.disableLight();
          scanSub.unsubscribe(); // stop scanning
          this.navCtrl.push(MainPage,data);
       // this.scan();

    }


      });  
     
         
       });

       // show camera preview
       this.qrScanner.show();
       this.showCamera()
     

       // wait for user to scan something, then the observable callback will be called

     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
}
verify(text:string):void{
  

       // console.debug(dbase);

                          
  this.data.getstop_byid(text).then(
      (stops: Stop[]): void => {

        
       // alert(stops.length);
   
     if(stops.length>0){

     // alert("scan was succesful");
     
     let scan :Scan;
       scan={
       id: "",
       assignment:this.siteid,
      tourstop:{
       stopname: stops[0].name,
       stopid :text
     },
    employee:{
  employeename:this.name,
  employeeid:this.empid
  },
       stop :text,
       type:"scans",
       date: new Date(),
       time: (new Date()).getTime(),
       long:this.gmLocation.lng,
       lat: this.gmLocation.lat
        
      }
         // scan.type="scans"
          //scan.stop=text;
        // console.debug(scan)

  this.data.addscan(scan).then(
      (promise: any): void => {

       // alert(promise);
             alert("success scan,id is"+promise);
        this.toast.show("success scan,id is"+promise, '5000', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      }
                    );
      });

    }
    else
    {
          alert("try again");
        this.toast.show("try again", '5000', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      }
                    );

    }


      }); 

    

    


}
onLocateUser() {
    this.geoloc.getCurrentPosition()
      .then(
        (location) => {
          console.log('position gotten: long:',location.coords.longitude,' lat:',location.coords.latitude);
          this.location = location;
          this.gmLocation.lat = location.coords.latitude;
          this.gmLocation.lng = location.coords.longitude;
        }
      )
      .catch(
        (error) => {
          console.log('Error getting location', error);
        }
      )

  }

enableLighting(){
 // var lighting ;
 
  if(this.lighting==true)
  {
    this.qrScanner.enableLight();

  }
  else
  {
  this.qrScanner.disableLight();
  }

}
disableLighting(){
  this.qrScanner.disableLight();
}

showCamera() {    
  (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
}
hideCamera() {    
  (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
}
}
