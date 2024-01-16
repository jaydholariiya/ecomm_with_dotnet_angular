import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { addproductDataType } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    cartData = new EventEmitter<addproductDataType[] | []>();
    constructor(private http : HttpClient) { }
    addProduct(data : addproductDataType){
      console.warn(data);
      return this.http.post('http://localhost:3000/product', data , {observe :'response'})
      
    }
  
    getProduct(){
      return this.http.get<addproductDataType[]>('http://localhost:3000/product')
    }
  
    deleteProduct(id : number){
      console.warn("deleted successfully");
      return this.http.delete(`http://localhost:3000/product/${id}`);
      
  }
  
  getPorduct(id : string){
      return this.http.get<addproductDataType>(`http://localhost:3000/product/${id}`);
  }
  
  updateProduct(product : addproductDataType){
      return this.http.put<addproductDataType>(`http://localhost:3000/product/${product.id}`,product);
  }
  
  popularProduct(){
      return this.http.get<addproductDataType[]>('http://localhost:3000/product?_limit=4');
  }
  
  TrendingProduct(){
      return this.http.get<addproductDataType[]>('http://localhost:3000/product?_limit=8');
  }
  
  searchProduct(query : string){
      return this.http.get<addproductDataType[]>(`http://localhost:3000/product?q=${query}`);
  }
  
  localAddToCart(data : addproductDataType){
      let cartData = [];
      let localcart = localStorage.getItem('localCart')
      if(!localcart){
          localStorage.setItem('localCart' , JSON.stringify([data]))
      }
      else{
          console.warn("not added");
          cartData = JSON.parse(localcart)
          cartData.push(data);
          console.warn("cart Data " , cartData);
          
          localStorage.setItem('localCart' , JSON.stringify(cartData));
          
          
          
      }
      this.cartData.emit(cartData);
  }
  
  removeItemCard(data : number){
      let getData = localStorage.getItem('localCart');
      if(getData){
          let items : addproductDataType[] = JSON.parse(getData);
          items = items.filter((item : addproductDataType)=> data!==item.id );
          localStorage.setItem('localCart',JSON.stringify(items))
          this.cartData.emit(items);
      }
      
  }
  
  
}
