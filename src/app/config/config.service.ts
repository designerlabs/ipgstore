import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  productUrl = '/products';
  categoryUrl = '/category';
  totalUrl = '/totalItem';
  constructor(private http: HttpClient) {

   }

   getProducts() {
    return this.http.get(this.productUrl);
  }

  getCategory(){
    return this.http.get(this.categoryUrl);
  }

  getProductByCategory(id){
    return this.http.get(`${this.categoryUrl}/${id}${this.productUrl}`);
  }

  getProduct(id, data){
    return this.http.put(`${this.productUrl}/${id}`, data);
  }

  getTotalItems(){
    return this.http.get(this.totalUrl);
  }

  updateTotalItems(id, data){
    return this.http.put(`${this.totalUrl}/${id}`, data);
  }
}
