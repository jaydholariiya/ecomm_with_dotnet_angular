import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { addproductDataType } from '../data-type';
import { ProductService } from '../services/product.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink , RouterModule , CommonModule , FormsModule , ReactiveFormsModule , NgbModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
    activeRoute: any;
    
  constructor(private product : ProductService) { }
  popularProduct : undefined | addproductDataType[];
  getValue :undefined | addproductDataType;
  trend : undefined | addproductDataType[];
  ngOnInit(): void {
    this.product.popularProduct().subscribe((result : any)=>{
        console.warn("popular result is : ",result);
        this.popularProduct = result;
    })

    this.product.TrendingProduct().subscribe((result : any)=>{
        console.warn("Trending result is :" , result);
        this.trend = result;
        
    })

    let data = this.activeRoute.snapshot.paramMap.get('productId');
    console.log("Product ID is " +data);
   data && this.product.getPorduct(data).subscribe((result : any)=>{
    console.warn(result);
    this.getValue = result;

  })
}
}
