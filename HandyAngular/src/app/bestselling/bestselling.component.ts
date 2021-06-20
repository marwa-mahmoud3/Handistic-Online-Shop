import { Route, Router } from '@angular/router';
import { CartService } from './../Services/CartService';
import { CategoryService } from './../Services/CategoryService';
import { UserService } from 'src/app/Services/user.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { Category } from '../Models/Category';
import { ProductWishlist } from '../Models/ProductWishlist';
import { ProductsService } from '../Services/ProductsService';
import { ProductWishlistService } from '../Services/ProductWishlistService';
@Component({
  selector: 'app-bestselling',
  templateUrl: './bestselling.component.html',
  styleUrls: ['./bestselling.component.css']
})
export class BestsellingComponent implements OnInit {
products : Product[]=[]
productList : Product[]=[]
filterTerm: string;
categories: Category[] = [];
CategoryList : Category[] = [];
CountProducts :number []=[]
user:any;

constructor(private productWishlistService:ProductWishlistService,private _productsService :ProductsService
  ,private UserService: UserService, private productservices: ProductsService,
  private router:Router,private categoryService : CategoryService,private CartService:CartService) {
}

ngOnInit(): void {
  this.loadCategories();
  this.getProductsPerPage(1); 
  this._productsService.GetTopSales().subscribe(data=>{
    this.productsCount=data.length;
this.numberOfPages=Math.ceil(this.productsCount / this.pageSize);  })
  this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe((
    data =>{
      this.user=data}))
}

/** WishList***/
public productWishlist;
AddToWishList(id){
  this.UserService.getIdByUserName(localStorage.getItem('username')).subscribe(
    data => {
      this.user = data;
      this.productWishlistService.GetWishlistByUserId(this.user.id).subscribe(
        product=>{
          this.productWishlist = new ProductWishlist(id,product.id);
          this.productWishlistService.CreateProductWishlist(this.productWishlist).subscribe( 
          );
        }
      )  
    }
  )
}



loadCategories()
{
  this.categoryService.getCategories().subscribe((data:any)=>{
    this.categories = data;
    this.categories.forEach(category => {
        this.productservices.getCountOfProducts(category.id).subscribe((data=>{
        if(data>0){
          //console.log(this.currentCategoryId);
          if(this.currentCategoryId==0){
            this.setCrrentCategoryId(category);
          }
          this.CategoryList.push(category); 
          console.log(this.CategoryList);
          this.CountProducts.push(data);
        }
        }));
     });
  });
}

public createImgPath = (serverPath: string) => {
  return `https://localhost:44339/${serverPath}`;
}
public response: {dbPath: ''};
allproduct =null
onCreate()
{
  this.allproduct = {
    productImagePath :this.response.dbPath,
  }
}
public uploadFinished = (event) => {
  this.response = event;
}

AddItemToCart(productId:number){
this.CartService.addItemToCart(this.user.id,productId,null).subscribe();
}
getPriceAfterDiscount(prouct:Product){
 let res=prouct.unitPrice;
 res-=prouct.unitPrice*(prouct.discount/100.0);
 return Math.ceil(res);
}

//pagination 
hasProducts:boolean = false;
errorMsg: string;
productsPerPage: Product[];
pageSize: number = 1;
productsCount= 0;
currentPageNumber: number = 1;
numberOfPages: number; // categoriesCount / pageSize
selectedCategoryId: number;
currentCategoryId:number=0
currentCategory:Category;


counter(i: number) {
return new Array(i);
}
setCrrentCategoryId(category){
this.currentCategoryId=category.id;
this.currentCategory=category;
this.getSelectedPage(1);
/*this.productservices.getCategoryProducts(category.id).subscribe((data=>{
this.productsCount=data.length;*/
//this.numberOfPages=Math.ceil(this.productsCount / this.pageSize);
//}//))
}
getProductsPerPage(currentPageNumber: number) {
this.productservices.getBestSellingPagination(this.pageSize, currentPageNumber).subscribe(
  data => {
    console.log(data);
    this.productsPerPage = data
    console.log(data);
    this.currentPageNumber = currentPageNumber;
    if(data.length != 0)
      this.hasProducts = true;
    else
      this.hasProducts = false;

  },
  error => {
    this.errorMsg = error;
  }
)
}

getSelectedPage(currentPageNumber: number) {
  this.getProductsPerPage(currentPageNumber);
}
getBest(){
  this._productsService.GetTopSales().subscribe(
    (products: any[]) => {
        this.products = products;
        this.products.forEach(product => {
            this.productList.push(product);
        })
    },
);
}

hasDiscount(product:Product){
  return product.discount>0;
}
}