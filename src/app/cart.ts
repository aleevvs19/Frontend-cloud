import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productos: any[] = [];
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  agregarProducto(prod: any) {
    this.productos.push(prod);
    this.countSubject.next(this.productos.length);
  }

  obtenerProductos() {
    return this.productos;
  }

  vaciarCarrito() {
    this.productos = [];
    this.countSubject.next(0);
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
    this.countSubject.next(this.productos.length);
  }
}