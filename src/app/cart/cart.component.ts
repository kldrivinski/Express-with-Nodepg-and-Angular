import { Component, OnInit } from '@angular/core';
import { Item } from '../interfaces/item'
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: Item[];
  add = false;
  edit = false;
  editItem;
  index: number;


  constructor(private cartApiService: ShoppingCartService, private router: Router) { }

  loadCartItems() {
    this.cartApiService.getCartApi().subscribe(items => {
      this.items = items;
      console.log(this.items)
    })
  }

  setIndex(index) {
    this.index = index;
  }


  showForm() {
    this.add = !this.add

  }

  addCartItem(form: NgForm) {
    this.add = !this.add
    this.cartApiService.addCartItem(form.value).subscribe(
      () => {
        this.loadCartItems();
      }
    )
  }

  editQuantity(id: number) {
    this.edit = !this.edit;
    // this.quantityEdit = !this.quantityEdit;
    console.log(id);
    this.cartApiService.getCartItem(id).subscribe(items => {
      this.editItem = items;
      console.log(this.editItem)
    })



  }

  editItemQuantity(form: NgForm) {
    this.edit = !this.edit;
    this.index = null;
    this.editItem.quantity = form.value.quantity;
    console.log(this.editItem);
    this.cartApiService.changeQuantity(this.editItem).subscribe(
      () => {
        this.loadCartItems();
      }
    )
  }


  deleteCartItem(id: number) {
    // calls the delete method on the service, passing it the id to be removed, subscribes to it to update
    this.cartApiService.deleteCartItem(id).subscribe(
      () => {
        this.loadCartItems();
      });
    console.log(id);
    console.log(this.items);

  }


  ngOnInit() {

    this.loadCartItems();

  }


}
