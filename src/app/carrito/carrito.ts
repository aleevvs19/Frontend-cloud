import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class CarritoComponent implements OnInit {
  productosCarrito: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Obtenemos los productos reales sincronizados desde el servicio
    this.productosCarrito = this.cartService.obtenerProductos();
  }

  get totalPagar(): number {
    return this.productosCarrito.reduce((acc, item) => {
      // Limpia el texto del precio (ej. "$1.500" -> 1500) para calcular el total
      const limpio = parseInt(item.price.replace('$', '').replace('.', ''), 10) || 0;
      return acc + limpio;
    }, 0);
  }

  eliminarItem(index: number) {
    this.cartService.eliminarProducto(index);
    this.productosCarrito = this.cartService.obtenerProductos();
  }

  vaciarCarrito() {
    this.cartService.vaciarCarrito();
    this.productosCarrito = [];
  }

  confirmarCompra() {
    if (this.productosCarrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    alert('🎉 ¡Pedido realizado con éxito! Puedes revisarlo en la sección "Mis Pedidos".');
    this.vaciarCarrito();
  }
}