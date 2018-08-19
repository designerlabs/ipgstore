import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']

})
export class ProductListComponent implements OnInit {
  constructor(private configService: ConfigService) {

   }
  productList:any;
  categoryList:any;
  cartItem:any;
  totalPrice: number = 0;
  totalItems: any;
  selected :any;

  ngOnInit() {
   
    this.allCategory();
    this.allProduct();
    this.getCartItems();
    this.getTotalPrice();

    console.log(this.totalItems)

  }

  selectCat(e, id){
    this.configService.getProductByCategory(id)
    .subscribe((data) => {
      this.productList = data;
    });
  }

  selectCart(id, data){
    // data = data != true;
    let body = {

      "categoryId": data.categoryId,
      "product_name": data.product_name,
      "product_img": data.product_img,
      "description": data.description,
      "checked": data.checked = data.checked != true,
      "price": data.price,
      "rating": data.rating
    }
    this.configService.getProduct(id, body)
    .subscribe((data) => {
      this.getCartItems();
      this.allProduct();
    
          
    if(data['checked']){
      this.totalPrice += data['price'];
    }else {
      this.totalPrice -= data['price'];
    }

    this.getTotalItems();
    });
    


  }


  getTotalItems(){
    this.configService.updateTotalItems(1, {"value": this.totalPrice}).subscribe((data) => {
        
    })
  }

  allCategory(){
    this.configService.getCategory()
    .subscribe((data) => {
      this.categoryList = data;
    })
  }

  allProduct(){
    this.configService.getProducts()
    .subscribe((data) => {
      this.productList = data;
    })
  }

  getCartItems(){
    this.configService.getProducts()
    .subscribe((data) => {
      this.cartItem = data;
      this.getTotalPrice();
    })
  }

  getTotalPrice(){
    this.configService.getTotalItems()
      .subscribe((data) => {
        this.totalItems = data[0].value;
        this.totalPrice = data[0].value;
      })
  }

  isActive(item) {
    return this.selected === item;
};
}
