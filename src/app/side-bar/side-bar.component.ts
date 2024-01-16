import { Component, NgModule, ViewChild } from '@angular/core';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { addproductDataType } from '../data-type';
import { ProductService } from '../services/product.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [SidebarModule , ButtonModule , AvatarModule , AvatarGroupModule , CommonModule , RippleModule , MatSidenavModule , MatListModule , MatButtonModule , MatIconModule , RouterModule ] ,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
    cartItem:number = 0;
    menuHeader : String = "default";
    sellerName : any = "";
    userName : any = '';
    data1 : any = "";
    data : any = "";
    sellerEmail : any = ""; 
    userEmail : any = "";
    usersInfo : string = "";
    searchResult : undefined | addproductDataType[];
  constructor(private router : Router , private product : ProductService) { }

  ngOnInit(): void {
    this.router.events.subscribe((val : any)=>{
        
        if(val.url){
            if(localStorage.getItem('seller') && val.url.includes('seller')){
                console.warn("seller in");
                this.menuHeader = 'seller';
                this.data1  = localStorage.getItem('seller');
                let parsedData = JSON.parse(this.data1);
                if (parsedData && parsedData['email']) {
                this.sellerEmail = parsedData['email'];

                console.log(this.sellerEmail);
                }
            }
            else if(localStorage.getItem('user')){
                console.warn("user in");
                this.menuHeader = 'user';
                this.data = localStorage.getItem('user');
                let parsedData = JSON.parse(this.data);
      
                if (parsedData && parsedData['email']) {
                  this.userEmail = parsedData['email'];
                  console.log("User Email:", this.userEmail);
         

                }

             
                
                


            }
            else{
                this.menuHeader = 'default';
                console.warn("seller out");
                
            }
        }
    })
    let cartData = localStorage.getItem('localCart');
   if( cartData ){
    this.cartItem = JSON.parse(cartData).length;
    
   }
   this.product.cartData.subscribe((result : any)=>{
    this.cartItem = result.length
   })
  }

  submitSearch(val : String){
    this.router.navigate([`search/${val}`]);
    window.location.href = `http://localhost:4200/search/${val}`;
    // setTimeout(()=>{ this.router.navigate([`search/${val}`]);},3000)
    // console.warn("value is :" + val);
   
  }

  logout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  userlogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
}

  searchProduct(query : KeyboardEvent){
    if(query){
        const ele = query.target as HTMLInputElement;
        console.log(ele.value);
        this.product.searchProduct(ele.value).subscribe((result)=>{
            console.log(result);
            this.searchResult = result;
            
        })
        

    }
  }

}
