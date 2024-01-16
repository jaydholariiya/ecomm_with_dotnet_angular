import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {


    isSellerLoggedIn = new BehaviorSubject<boolean>(false);
    isLogin = new EventEmitter<boolean>(false);
  constructor(private http : HttpClient ,private router : Router) { }
  userSignUp(data :SignUp){
    console.log('user sign up');
     this.http.post('http://localhost:3000/seller',data,{observe : 'response'}).subscribe((result)=>{
     this.isSellerLoggedIn.next(true);   
     localStorage.setItem('seller',JSON.stringify(result.body));
 
     
     this.router.navigate(['seller-home']);
     console.warn("result" , result);
    }); 
  }



  userLogin(data : login){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe : 'response'}).subscribe((result : any)=>{
        console.warn(result);

        if(result && result.body && result.body.length){
            this.isSellerLoggedIn.next(true);
            localStorage.setItem("seller",JSON.stringify(result.body));
            this.router.navigate(['seller-home']);
            console.warn("result" , result);
            // this.router.navigate(['seller-home']);
        }
        else{
            console.warn("Login Failed");
            this.isLogin.emit(true);
            
        }
        
    });

  

   
    // console.log('login data ', data);
  }




  reloadSeller() {
    if(localStorage.getItem('seller')){
        this.isSellerLoggedIn.next(true);
        // this.isLogin.next(true);
        this.router.navigate(['seller-home']);
    }
}
    
}
