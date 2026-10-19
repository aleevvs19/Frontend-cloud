
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  procesandoCompra: boolean = false;

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productosCarrito = this.cartService.obtenerProductos();
  }

  // Calcular el total mostrado en el carrito
  get totalPagar(): number {
    return this.productosCarrito.reduce((total, producto) => {

      const precio = Number(
        String(producto.price)
          .replace('$', '')
          .replace(/\./g, '')
          .replace(',', '.')
          .trim()
      ) || 0;

      const cantidad = Number(producto.cantidad ?? 1);

      return total + precio * cantidad;

    }, 0);
  }

  // Eliminar un producto
  eliminarItem(index: number): void {

    if (this.procesandoCompra) {
      return;
    }

    this.cartService.eliminarProducto(index);

    this.productosCarrito =
      this.cartService.obtenerProductos();

    this.cdr.detectChanges();
  }

  // Vaciar el carrito
  vaciarCarrito(): void {

    if (this.procesandoCompra) {
      return;
    }

    this.cartService.vaciarCarrito();

    this.productosCarrito = [];

    this.cdr.detectChanges();
  }

  // Confirmar la compra con Spring Boot
  confirmarCompra(): void {

    if (this.procesandoCompra) {
      return;
    }

    if (this.productosCarrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    // Obtener la sucursal del primer producto
    const sucursalId = Number(
      this.productosCarrito[0].sucursalId
    );

    if (!Number.isInteger(sucursalId) || sucursalId <= 0) {
      alert(
        'Hay productos antiguos en el carrito. Vacía el carrito y agrégalos nuevamente.'
      );
      return;
    }

    // Agrupar los productos por su ID real
    const cantidades = new Map<number, number>();
    const stocks = new Map<number, number>();

    for (const producto of this.productosCarrito) {

      const productoId = Number(producto.productoId);
      const cantidad = Number(producto.cantidad ?? 1);
      const stock = Number(producto.stock);

      // Validar producto y cantidad
      if (
        !Number.isInteger(productoId) ||
        productoId <= 0 ||
        !Number.isInteger(cantidad) ||
        cantidad <= 0
      ) {
        alert(
          'Hay un producto con datos inválidos. Actualiza el carrito.'
        );
        return;
      }

      // Validar sucursal
      if (Number(producto.sucursalId) !== sucursalId) {
        alert(
          'No puedes comprar productos de distintas sucursales en un mismo pedido.'
        );
        return;
      }

      // Acumular unidades del mismo producto
      const acumulado =
        (cantidades.get(productoId) ?? 0) + cantidad;

      cantidades.set(productoId, acumulado);
      stocks.set(productoId, stock);
    }

    // Validar stock
    for (const [productoId, cantidad] of cantidades) {

      const stock = stocks.get(productoId);

      if (
        stock === undefined ||
        !Number.isFinite(stock) ||
        cantidad > stock
      ) {
        alert(
          `Stock insuficiente para el producto ID ${productoId}.`
        );
        return;
      }
    }

    // Crear los detalles que espera Spring Boot
    const detalles = Array.from(
      cantidades,
      ([productoId, cantidad]) => ({
        productoId,
        cantidad
      })
    );

    // Estructura correcta del pedido
    const payloadPedido = {
      sucursalId: sucursalId,
      tipoEntrega: 'RETIRO_EN_TIENDA',
      detalles: detalles
    };

    const urlBackend =
      `${environment.apiUrl}/pedidos`;

    this.procesandoCompra = true;
    this.cdr.detectChanges();

    // Enviar pedido usando la autenticación MSAL
    this.http.post(urlBackend, payloadPedido).subscribe({

      next: (pedidoGuardado) => {

        console.log(
          'Pedido guardado en Spring Boot:',
          pedidoGuardado
        );

        this.procesandoCompra = false;

        // Vaciar solamente después de una respuesta exitosa
        this.vaciarCarrito();

        alert(
          '🎉 ¡Pedido registrado correctamente!'
        );
      },

      error: (err) => {

        console.error(
          'Error al confirmar el pedido:',
          err
        );

        this.procesandoCompra = false;
        this.cdr.detectChanges();

        alert(
          `No se pudo confirmar el pedido. Error HTTP: ${err.status}`
        );
      }
    });
  }
}
