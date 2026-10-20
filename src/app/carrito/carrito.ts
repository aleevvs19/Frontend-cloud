
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart';
import { environment } from '../../environments/environment';

interface ProductoBackend {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  sucursalId: number;
}

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class CarritoComponent implements OnInit {

  productosCarrito: any[] = [];
  procesandoCompra = false;

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productosCarrito = this.cartService.obtenerProductos();
  }

  get totalPagar(): number {
    return this.productosCarrito.reduce((total, producto) => {
      const precio = Number(
        String(producto.price ?? '0')
          .replace('$', '')
          .replace(/\./g, '')
          .replace(',', '.')
          .trim()
      ) || 0;

      return total + precio * Number(producto.cantidad ?? 1);
    }, 0);
  }

  eliminarItem(index: number): void {
    if (this.procesandoCompra) return;

    this.cartService.eliminarProducto(index);
    this.productosCarrito = this.cartService.obtenerProductos();
    this.cdr.detectChanges();
  }

  vaciarCarrito(): void {
    if (this.procesandoCompra) return;

    this.cartService.vaciarCarrito();
    this.productosCarrito = [];
    this.cdr.detectChanges();
  }

  private finalizarProceso(): void {
    this.procesandoCompra = false;
    this.cdr.detectChanges();
  }

  private normalizarNombre(nombre: string): string {
    return nombre
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  confirmarCompra(): void {

    if (this.procesandoCompra) return;

    if (this.productosCarrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    this.procesandoCompra = true;
    this.cdr.detectChanges();

    // Consultar los productos REALES antes de comprar
    this.http.get<ProductoBackend[]>(
      `${environment.apiUrl}/productos`
    ).subscribe({

      next: (productosBackend) => {

        const cantidades = new Map<number, number>();
        let sucursalId: number | null = null;

        for (const item of this.productosCarrito) {

          // Productos de la pantalla principal
          const idReal = Number(item.productoId);

          let producto = Number.isInteger(idReal) && idReal > 0
            ? productosBackend.find(p => Number(p.id) === idReal)
            : undefined;

          // Compatibilidad con productos de Explorar
          if (!producto) {
            const nombre = this.normalizarNombre(
              String(item.name ?? item.nombre ?? '')
            );

            producto = productosBackend.find(p =>
              this.normalizarNombre(p.nombre) === nombre
            );
          }

          if (!producto) {
            this.finalizarProceso();
            alert(
              `No se encontró "${item.name}" en el catálogo real.`
            );
            return;
          }

          const id = Number(producto.id);
          const sucursal = Number(producto.sucursalId);
          const cantidad = Number(item.cantidad ?? 1);

          if (
            !Number.isInteger(id) || id <= 0 ||
            !Number.isInteger(sucursal) || sucursal <= 0 ||
            !Number.isInteger(cantidad) || cantidad <= 0
          ) {
            this.finalizarProceso();
            alert(
              `El backend entregó datos inválidos para "${producto.nombre}".`
            );
            console.error('Producto del backend:', producto);
            return;
          }

          if (sucursalId === null) {
            sucursalId = sucursal;
          }

          if (sucursalId !== sucursal) {
            this.finalizarProceso();
            alert(
              'No puedes mezclar productos de distintas sucursales.'
            );
            return;
          }

          const acumulado = (cantidades.get(id) ?? 0) + cantidad;

          if (acumulado > Number(producto.stock)) {
            this.finalizarProceso();
            alert(`Stock insuficiente para "${producto.nombre}".`);
            return;
          }

          cantidades.set(id, acumulado);
        }

        if (sucursalId === null || cantidades.size === 0) {
          this.finalizarProceso();
          alert('No se pudo preparar el pedido.');
          return;
        }

        const detalles = Array.from(
          cantidades,
          ([productoId, cantidad]) => ({
            productoId,
            cantidad
          })
        );

        const pedido = {
          sucursalId,
          tipoEntrega: 'RETIRO_EN_TIENDA',
          detalles
        };

        console.log('Pedido enviado a Spring Boot:', pedido);

        // Confirmar compra
        this.http.post(
          `${environment.apiUrl}/pedidos`,
          pedido
        ).subscribe({

          next: (respuesta) => {

            console.log('Pedido registrado:', respuesta);

            this.finalizarProceso();
            this.vaciarCarrito();

            alert('¡Pedido registrado correctamente!');
          },

          error: (error) => {

            console.error('Error del backend:', error);

            this.finalizarProceso();

            alert(
              `No se pudo confirmar la compra. HTTP ${error.status}`
            );
          }
        });
      },

      error: (error) => {

        console.error('Error al consultar productos:', error);

        this.finalizarProceso();

        alert(
          `No se pudieron consultar los productos. HTTP ${error.status}`
        );
      }
    });
  }
}
