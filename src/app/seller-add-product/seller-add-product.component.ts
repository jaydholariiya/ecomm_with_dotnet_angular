import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { addproductDataType } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [CommonModule , FormsModule , ReactiveFormsModule , RouterLink],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
    addProductMessage : string | undefined;
    constructor(private product : ProductService) { }
  
    ngOnInit(): void {
     
    }
    submit(data : addproductDataType){ 
      this.product.addProduct(data).subscribe((result : any)=>
      {
          if(result){
              this.addProductMessage = "Data Added SuccessFully";
          }
          else{
              this.addProductMessage = "Something went wrong! Try again.";
          }
          setTimeout(()=>{ this.addProductMessage = undefined;
          
          
          },3000);
        }
      );
      }
}
