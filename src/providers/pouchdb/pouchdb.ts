import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import CryptoPouch  from 'crypto-pouch';
 import CryptoJS from 'crypto-js';
import { Stop} from '../../models/stop.model';
import { Scan} from '../../models/scan.model';
import { Employee} from '../../models/employee.model';

/*
  Generated class for the PouchdbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PouchdbProvider {

  /* private _DB     : any;
   private success : boolean = true;*/
    // public stops :any; 
     public scans;
     private  data: any;
     private localDatabase: any;
   // private pendingSync: Promise<ISyncResult>;
     private remoteDatabase: any;
     //private remote_url='https://redcell.cloudant.com/redcell';
    //private remote_url='http://197.232.71.62:5984/redcell';
    // private remote_url='http://192.168.1.103:5984/redcell';
     private remote_url='http://192.168.1.103:5984/redcell_dev';
     private remote_username:any;
     private remote_password:any;


  constructor(public http: HttpClient) {
    
  	 // this.scans=[];
   //  PouchDB.plugin(require('crypto-pouch'));
  this.remote_username='redcell';
   this.remote_password='redcell99@';
   this.remoteDatabase= new PouchDB(this.remote_url,
   	   {
                auth: {
                   username: this.remote_username,
       				 password: this.remote_password
                },
                // The database already exists - no need for PouchDB to check to see
                // if it exists (and try to create it). This saves on some API requests.
                skip_setup: true
        });

  let options = {
      live: true,
      retry: true,
      continuous: true, 
       auth: {
                   username: this.remote_username,
       				 password: this.remote_password
                }    
    };
//window["PouchDB"] = PouchDB;
  this.localDatabase = new PouchDB('redcell');
 //var db = new PouchDB('redcell');
  //this.localDatabase.crypto(this.remote_password);
   this.localDatabase.sync( this.remoteDatabase,options).on('complete', function () {
  // yay, we're done!
  console.debug("done syncing");
}).on('error', function (err) {
  // boo, something went wrong!
  console.debug("there was an error while syncing")
});

  	
  // this.create_views();
  }
     public info():any{
      this.localDatabase.info().then(function (info) {
        alert(info.doc_count);
      });
     }

     public getDB() : any {

        if ( ! this.localDatabase ) {

            throw( new Error( "Database is not available - please configure an instance." ) );

        }

        return( this.localDatabase );

    }


  public  getDocuments(){

     return this.localDatabase.allDocs({
 
        include_docs: true
 
      });
   }

   public  validPassword(password,data){

var bytes  = CryptoJS.AES.decrypt(data.hash, password);
var plaintext = bytes.toString(CryptoJS.enc.Utf8);
console.debug(data.saltplaintext);
console.debug(plaintext);
console.debug("match:"+data.salt==plaintext);
return data.salt==plaintext;

}

public addscan(scan:Scan): Promise<string> {

   
    let promise = this.localDatabase
      .post({
        
         assignment:scan.assignment,
       tourstop:{
       stopname: scan.tourstop.stopname,
       stopid :scan.tourstop.stopid
        },
     employee:{
      employeename:scan.employee.employeename,
      employeeid:scan.employee.employeeid,
      },
      stop: scan.stop,
       type: scan.type,
       date: new Date(),
       time: (new Date()).getTime(),
       long:scan.long,
       lat: scan.lat
        
      })
      .then(
      (result): string => {

         alert(result.id);

        return (result.id);

      }).catch(function (err) {
  // oh noes! we got an error
  console.debug(err);
});

    return (promise);

  }
    public getstop_byid(data:any): Promise<Stop[]>{
     // date= new Date();
      /*dat={
        employee:data,
        date:new Date();
      }*/

     let promise =  this.localDatabase.query('stops/stops',{key:data}).then(function (res):Stop[] {

      	let stops = res.rows.map(
          (row: any): Stop => {
            //console.debug(row);
            return ({
              id: row.value._id,
              name: row.value.name,
              assignment: row.value.assignment,
              long:row.value.location.long,
              lat:row.value.location.lat
            });
        });

		return (stops);

		});

       
		return (promise);

		/*.catch(function (err) {
		  // some error
		  console.debug(err);

		});*/

	//console.debug(stops);
  //  return stops;
		
    /* this.data = this.localDatabase.allDocs({
 
        include_docs: true
 
      });

     return (this.data);*/
 
  }

   public getscans(): Promise<Scan[]>{

     let promise =  this.localDatabase.query('scans/scans',{limit: 5}).then(function (res):Scan[] {

        let scans = res.rows.map(
          (row: any): Scan => {
            //console.debug(row);
            return ({
              id: row.value._id,
              stop: row.value.stop,
              type:row.value.type,
              assignment:row.value.assignment,
               tourstop:{
                  stopname: row.value.tourstop.stopname,
                  stopid: row.value.tourstop.stopid,
                  },
              employee:{
                  employeename:row.value.employee.employeename,
                   employeeid:row.value.employee.employeeid
               },
              date:row.value.date,
              time:row.value.time,
              long:row.value.long,
              lat:row.value.lat
            });
        });

    return (scans);

    });

       
    return (promise);
  }
     public getscans_byemployee(data:any): Promise<Scan[]>{

      console.debug(data);
      let dat=[data,"2018-02-16T20:25:04.596Z"]
      console.debug(dat);

     let promise =  this.localDatabase.query('scans/scans_employee',{/*keys:dat*/key:data,descending:true,limit : 5}/*,{key:data}{keys:dat}*/).then(function (res):Scan[] {

        let scans = res.rows.map(
          (row: any): Scan => {
            console.debug(row);
            return ({
              id: row.value._id,
              assignment:row.value.assignment,
              tourstop:{
              stopname:row.value.tourstop.stopname,
              stopid: row.value.tourstop.stopid,
              },
             employee:{
                  employeename:row.value.employee.employeename,
                   employeeid:row.value.employee.employeeid,
               },
              stop: row.value.stop,
              type:row.value.type,
              date:row.value.date,
              time:row.value.time,
              long:row.value.long,
              lat:row.value.lat
            });
        });

    return (scans);

    });

       
    return (promise);
  }


       public getuser(data:any): Promise<any>{

     let promise =  this.localDatabase.query('employees/users',{key:data.username}).then(function (res):any {
       // this.validPassword(data.password,userdata);
          console.debug(res.rows[0].value);
          var userdata= res.rows[0].value
          
                     if (!userdata) {
                           return false;
                          }
                          else{
                            var bytes  = CryptoJS.AES.decrypt(userdata.account.hash, data.password);
                            var plaintext = bytes.toString(CryptoJS.enc.Utf8);
                           console.debug(userdata.account.salt);
                          console.debug(plaintext);
                            console.debug(userdata.account.salt==plaintext);
                             

                            if(userdata.account.salt!=plaintext){
                              return false
                            }
                             return userdata;
                          }
               /*        if (!this.validPassword(data.password,userdata)) {

                            return false;
                          }  
                           return userdata;   
                   */
          
    /*       if(res.rows.length!== 0){
            //alert("yes");
        let employee = res.rows.map((row: any): any => {
            //console.debug(row);
            if(data.password==row.value.account.password){
              return ({
              id: row.value._id,
              employeeID: row.value.employeeID,
              name: row.value.name,   
              assignment: row.value.assignment,
              site: row.value.site.sitename,
            });

            }
            else{
              return ({});
            }
            
        });

    return (employee);
  }
  else{
    // alert("no");

     let emp =[];
     emp.push({})
    return (emp);
  }*/

    }).catch(function (err) {
  // handle any errors
  console.debug(err);
});
 //console.debug(promise);
       
    return (promise);
  }
   public getstops(): Promise<Stop[]>{

     let promise =  this.localDatabase.query('stops/stops').then(function (res):Stop[] {

      	let stops = res.rows.map(
          (row: any): Stop => {
            //console.debug(row);
            return ({
              id: row.value._id,
              name: row.value.name,
              assignment: row.value.assignment,
              long:row.value.location.long,
              lat:row.value.location.lat
            });
        });

		return (stops);

		});

       
		return (promise);

		/*.catch(function (err) {
		  // some error
		  console.debug(err);

		});*/

	//console.debug(stops);
  //  return stops;
		
    /* this.data = this.localDatabase.allDocs({
 
        include_docs: true
 
      });

     return (this.data);*/
 
  }
  public validate(data){
  	 let stops=[];
  		for(var i=0; i<data.rows.length; i++){
			//console.debug(res.rows[i].value);
          stops.push(data.rows[i].value);
         
		}

		console.debug(stops);


  }

  /*   public create_views():any {



  let views_scans = {
		  _id: '_design/scans',
		  views: {
		    all: {
		      map:function (doc) {
				   if(doc.type == 'scans') {
				       emit(doc.id,doc);
				   }
				}.toString()
		    },
		     by_stop: {
		       map:function (doc) {
				   if(doc.type == 'scans') {
				       emit(doc.stop,doc);
				   }
				}.toString()
		    }
		  }
		};


  let views_stops = {
		  _id: '_design/stops',
		  views: {
		    all: {
		      map:function (doc) {
				   if(doc.type == 'stops') {
				       emit(doc.id,doc);
				   }
				}.toString()
		    },
		     by_assignment: {
		         map:function (doc) {
				   if(doc.type == 'stops') {
				       emit(doc.assignment,doc);
				   }
				}.toString()
		    }
		  }
		};
    	// save it
		this.localDatabase.put(views_stops).then(function () {
			console.debug("stops views created")
		  // success!
		}).catch(function (err) {
			console.debug(err);
		  // some error (maybe a 409, because it already exists?)
		});

		this.localDatabase.put(views_scans).then(function () {
			console.debug("scans views created")
		  // success!
		}).catch(function (err) {
			console.debug(err);
		  // some error (maybe a 409, because it already exists?)
		});
    }*/


}
