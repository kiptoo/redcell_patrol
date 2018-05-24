import { Component,ViewChild } from '@angular/core';
import {NavController,Navbar  } from 'ionic-angular';
import { MainPage  } from '../main/main';
import { CryptoJS  } from 'crypto-js';
//import { LoginPage  } from '../login/login';
 import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { PouchdbProvider } from '../../providers/pouchdb/pouchdb';
import { Employee} from '../../models/employee.model';
import { Toast } from '@ionic-native/toast';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
    @ViewChild(Navbar) navBar: Navbar;
 employee:any;
userForm: FormGroup;

  constructor(private fb: FormBuilder,public navCtrl: NavController,public toast :Toast,private data :PouchdbProvider) {
 this.createuserForm();
 //this.userForm.valueChanges.subscribe(_ => this.checkFormValidity());
  }
  
ionViewDidLoad() {
      this.navBar.backButtonClick = (e:UIEvent)=>{

     // todo something
     //this.navController.pop();
     //alert("yes");
       // this.qrScanner.hide(); // hide camera preview
         //this.hideCamera() 
          //this.qrScanner.disableLight();
        // this.scanSub.unsubscribe(); // stop scanning
          this.navCtrl.push(LoginPage);
    }
}
     
   /* itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }*/
    openPage(){
      let username = this.userForm.get('username').value;
      let password =this.userForm.get('password').value;
      this.verifyuser(username,password);
      // alert(password);

  //	this.nav.setRoot(MainPage);
  //this.navCtrl.push(MainPage);
  }
  // Decrypt
  decryptpassword(password,data){

var bytes  = CryptoJS.AES.decrypt(data.hash, password);
var plaintext = bytes.toString(CryptoJS.enc.Utf8);
return data.salt==plaintext;
}
  verifyuser(username :string,password:string){
   
//alert(password);
let data={
  username:username.toLowerCase(),
  password:password
}
this.data.getuser(data).then(
      (employee: any): void => {

     // console.debug(employee);
       if(employee){
        this.employee = employee;
          var user={
          "name":this.employee.name,
          "assignment":this.employee.assignment,
          "id":this.employee.id,
          "site":this.employee.site.name,
        }
         this.navCtrl.push(MainPage,user);
       }
       else{
      //  alert("Wrong username or password");
         this.toast.show("Wrong username or password", '5000', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      }
                    );
       }
/*     if(Object.keys(employee[0]).length > 0){
      let name =employee[0].name;
     this.employee = employee;


      //alert("welcome "+name )
       console.debug(this.employee[0]);
     this.navCtrl.push(MainPage,this.employee[0]);
        this.toast.show("welcome "+name, '5000', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      }
                    );

     }
     else{
     // alert("Wrong username or password")
       this.toast.show("Wrong username or password", '5000', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      }
                    );

     }*/
    // this.Scans.push(scan);
   

  

      }); 

  }
createuserForm(): void {
        this.userForm = this.fb.group({
            //username: ['', [Validators.required, Validators.email]],
             username: ['',Validators.required],
            password: ['',
                [
                    Validators.required,
                   /* Validators.minLength(6),
                    Validators.maxLength(12),
                    this.checkForSpecialOrDigit(/((@|!|#|\$|%|\^|&|\*|\(|\)|_|\+|\-|=)|[0-9])/),
                    this.checkForCapitalLetter(/[A-Z]/),
                    this.checkForLowerCaseLetter(/[a-z]/)*/
                ]]
        });


       
    }

}
