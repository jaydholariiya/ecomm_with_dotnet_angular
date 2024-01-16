import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { addproductDataType, cart } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule , FormsModule , ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
    getData : undefined | addproductDataType;
    productQua : number = 1;
    removeCart = false;
    // userId :String; 
  constructor(private activeRoute : ActivatedRoute , 
              private product : ProductService
    ) { }

  ngOnInit(): void {

    let data = this.activeRoute.snapshot.paramMap.get('productId');
    console.log("Product ID is " +data);
   data && this.product.getPorduct(data).subscribe((result : any)=>{
    console.warn(result);
    this.getData = result;

    
   })

   let cartData = localStorage.getItem('localCart');
   if(data && cartData){
    let item = JSON.parse(cartData);
    item = item.filter((items : addproductDataType)=>data == items.id.toString())
    if(item.length){
        this.removeCart = true;
    }
    else{
        this.removeCart = false;
    }
   }

   

  }
  handleQuantity(val : string){
    if(this.productQua > 1 && val == 'min'){
        this.productQua = this.productQua - 1;
    }
    else if(this.productQua < 20 && val == 'max'){
        this.productQua += 1;
    }
  }

  AddToCart(){
    if(this.getData){
        // console.warn(this.getData + "Data found");
        this.getData.quantity = this.productQua;
        if(localStorage.getItem('user')){
        
        console.warn(this.getData.quantity + "product");
        this.product.localAddToCart(this.getData);
        this.removeCart = true

        let user = localStorage.getItem('user');
        let userID = user && JSON.parse(user).id;
        // console.log(userId);

        let cartData : cart = {...this.getData, userID , productID : this.getData.id }
        console.warn(cartData);
        delete cartData.id;
        } 
        
     }
  }
  RemoveToCart(id : number){
    this.product.removeItemCard(id);
    this.removeCart = false
  }
}
