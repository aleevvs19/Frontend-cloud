import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class CarritoComponent implements OnInit {
  productosCarrito: any[] = [];

  constructor(
    private cartService: CartService,
    private http: HttpClient
  ) {}

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

    const payloadPedido = {
      items: this.productosCarrito,
      total: this.totalPagar,
      fecha: new Date().toISOString()
    };

    const urlBackend = `${environment.apiUrl}/pedidos`;

    // Dispara la petición POST hacia el backend, activando el interceptor de MSAL para inyectar el Token Bearer
    this.http.post(urlBackend, payloadPedido).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        alert('🎉 ¡Pedido realizado con éxito y registrado en el servidor!');
        this.vaciarCarrito();
      },
      error: (err) => {
        console.error('Error al conectar con el backend:', err);
        alert('Hubo un error al procesar tu pedido. Revisa la consola.');
      }
    });
  }
}