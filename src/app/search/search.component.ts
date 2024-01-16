import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { addproductDataType } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule , FormsModule , ReactiveFormsModule , RouterLink , RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
    searchResult : undefined | addproductDataType[];
    constructor(private activateRoute : ActivatedRoute , private product : ProductService) { }
  
    ngOnInit(): void {
      let query = this.activateRoute.snapshot.paramMap.get('query');
      query && this.product.searchProduct(query).subscribe((result : any)=>{console.warn(result);
          this.searchResult = result;
      })
    }
}
