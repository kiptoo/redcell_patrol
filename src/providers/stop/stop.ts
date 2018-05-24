import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PouchdbProvider } from '../pouchdb/pouchdb';
import { Stop} from '../../models/stop.model';

/*
  Generated class for the StopProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StopProvider {

  constructor(/*public http: HttpClient,public db :PouchdbProvider,public stop :Stop*/) {
    
  }

}
