import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item'



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  itemsURL = "http://localhost:3000/cart-items";


  constructor(private http: HttpClient) { }

  getCartApi(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsURL)
  }

  getCartItem(id) {
    return this.http.get<Item[]>(`http://localhost:3000/cart-items/${id}`)
  }

  addCartItem(item): Observable<void> {
    return this.http.post<void>(this.itemsURL, item);
  }

  changeQuantity(item): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/cart-items/${item.id}`, item);
  }

  deleteCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/cart-items/${id}`)
    // console.log("delete!")
  }


}
