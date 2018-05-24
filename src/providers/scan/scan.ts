import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PouchdbProvider } from '../pouchdb/pouchdb';
//import { StopProvider } from '../stop/Stop';
//import { Scan} from '../../models/scan.model';
//import { Stop} from '../../models/stop.model';

/*
  Generated class for the ScanProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ScanProvider {

  constructor(private http: HttpClient,public db :PouchdbProvider/*,public scan :Scan,public stop :Stop ,public stopprovider :StopProvider, */ ) {
    
  }

/*     public addscan(scan ) : Promise<string> {

     	 var promise = this.getDB()
            .put({
            
                name: scan.name;
            })
            .then(
                ( result: scan ) : string => {

                    return( scan.id );

                }
                );

        return( promise );


     }*/
     public listscan() {
         
     }

     public getDB() : any {

        return( this.db.getDB() );

    }
    public getDocuments():any {

    	return(this.db.getDocuments());

    }

}
