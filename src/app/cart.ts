import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  agregarProducto(prod: any) {
    this.items.push(prod);
    this.countSubject.next(this.items.length);
    console.log('Producto agregado al carrito:', prod.name);
  }

  obtenerProductos() {
    return this.items;
  }

  eliminarProducto(index: number) {
    this.items.splice(index, 1);
    this.countSubject.next(this.items.length);
  }

  vaciarCarrito() {
    this.items = [];
    this.countSubject.next(0);
  }
}