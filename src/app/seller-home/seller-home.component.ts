import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { addproductDataType } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule , FormsModule  , RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
    productList : undefined | addproductDataType[];
    productMsg : undefined | string;
  constructor(private product : ProductService) { }

  ngOnInit(): void {
    this.product.getProduct().subscribe((result)=>{
        console.warn(result);
        this.productList = result;

    })
  }

deleteProduct(id : number){
    // console.warn("data Deleted Successgully ID is : " , id);

    this.product.deleteProduct(id).subscribe((result)=>{
        if(result){
            this.productMsg = "Product Is Deleted"
        }
        this.product.getProduct().subscribe((result)=>{
            console.warn(result);
            this.productList = result;
    
        })
        
        setTimeout(()=>{this.productMsg = undefined},3000);
    })
    
}
}
