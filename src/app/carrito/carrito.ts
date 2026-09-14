import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class CarritoComponent implements OnInit {
  productosCarrito: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.productosCarrito = this.cartService.obtenerProductos();
  }

  eliminar(index: number) {
    this.cartService.eliminarProducto(index);
    this.productosCarrito = this.cartService.obtenerProductos();
  }

  vaciar() {
    this.cartService.vaciarCarrito();
    this.productosCarrito = [];
  }

  calcularTotal(): string {
    let total = 0;
    this.productosCarrito.forEach(p => {
      const num = parseInt(p.price.replace('$', '').replace('.', ''), 10) || 0;
      total += num;
    });
    return '$' + total.toLocaleString('es-CL');
  }

  pagar() {
    alert('¡Pedido confirmado y pagado con éxito! 🎉');
    this.vaciar();
  }
}