import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { addproductDataType } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule , FormsModule , RouterLink],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
    constructor(private route : ActivatedRoute , private product : ProductService , private router : Router ) { }
    ProductData : undefined | addproductDataType;
    ProductMSG : string | undefined;
  ngOnInit(): void {

    let ProductId = this.route.snapshot.paramMap.get('id');
    console.log("producct id is : " + ProductId);
    ProductId && this.product.getPorduct(ProductId).subscribe((result)=>{
        console.warn(result);
        this.ProductData = result;
    })

      
}
  
  submit(data : addproductDataType){
    console.warn(data);
    if(this.ProductData){
        data.id = this.ProductData.id 
    }
    this.product.updateProduct(data).subscribe((result)=>{console.warn(result)
        if(result){
            this.ProductMSG = "Data Updated SuccessFully";
        }

        
    }
    );
    setTimeout(()=>{this.ProductMSG = undefined;
    this.router.navigate(['seller-home'])
    },2000);

    
  }
}
