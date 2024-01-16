import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { login, SignUp } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [CommonModule , FormsModule , RouterLink , ReactiveFormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
    constructor(private seller : SellerService , private router : Router) {}
    showing = false;
    IsErrorAuth : String = "";
    ngOnInit(): void {
      this.seller.reloadSeller();
    
    }
    
    signUp(data: SignUp): void{
      console.warn(data);
      this.seller.userSignUp(data)
          
     
    }  
  
    Login(data : login) : void{
      this.IsErrorAuth = "";
      console.warn(data);
      this.seller.userLogin(data)
      this.seller.isLogin.subscribe((result)=>{
          if(result){
              this.IsErrorAuth = "User Email Or Password Not Matched Try Again !!"
          }
      })
      
    }
  
    openLogin(){
      this.showing=true;
      
    }
   
    openSignUp(){
      this.showing = false;
    }
}
