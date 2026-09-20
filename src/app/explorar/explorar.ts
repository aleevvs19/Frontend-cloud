import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart';

interface ProductoBackend {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  sucursalId: number;
}

interface Producto {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: string;
  image: string;
  tag: string;
  desc: string;
  stock: number;
}

@Component({
  selector: 'app-explorar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './explorar.html',
  styleUrl: './explorar.css'
})
export class ExplorarComponent implements OnInit {

  terminoBusqueda: string = '';
  categoriaActiva: string = 'Todos';

  cargando: boolean = true;
  error: string = '';

  categorias = [
    'Todos',
    'Panadería',
    'Cafetería',
    'Pastelería',
    'Bebidas'
  ];

  productos: Producto[] = [];

  private readonly API_URL = 'http://localhost:8080/api/productos';

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {

    this.cargando = true;
    this.error = '';

    this.http.get<ProductoBackend[]>(this.API_URL)
      .subscribe({

        next: (productosBackend) => {

          this.productos = productosBackend.map(producto => ({
            id: producto.id,
            name: producto.nombre,
            category: 'Todos',
            price: producto.precio,
            rating: '5.0',
            image: '🛍️',
            tag: producto.stock > 0 ? 'Disponible' : 'Sin stock',
            desc: producto.descripcion || 'Producto disponible en Pedidos360.',
            stock: producto.stock
          }));

          this.cargando = false;

          console.log(
            'PRODUCTOS BACKEND:',
            this.productos
          );
        },

        error: (error) => {

          console.error(
            'ERROR AL OBTENER PRODUCTOS:',
            error
          );

          this.cargando = false;

          if (error.status === 401) {
            this.error =
              'No tienes autorización para consultar los productos. Debes iniciar sesión con un token válido para la API.';
          } else if (error.status === 0) {
            this.error =
              'No se pudo conectar con el backend. Verifica que Spring Boot esté ejecutándose en el puerto 8080.';
          } else {
            this.error =
              'No fue posible cargar los productos desde el backend.';
          }
        }
      });
  }

  get productosFiltrados(): Producto[] {

    return this.productos.filter(producto => {

      const coincideCat =
        this.categoriaActiva === 'Todos' ||
        producto.category === this.categoriaActiva;

      const texto =
        this.terminoBusqueda.toLowerCase().trim();

      const coincideTexto =
        producto.name.toLowerCase().includes(texto) ||
        producto.desc.toLowerCase().includes(texto);

      return coincideCat && coincideTexto;
    });
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaActiva = categoria;
  }

  agregarAlCarrito(producto: Producto): void {

    if (producto.stock <= 0) {
      alert('❌ Este producto no tiene stock disponible.');
      return;
    }

    this.cartService.agregarProducto(producto);

    alert(
      `🛒 ¡${producto.name} agregado al carrito!`
    );
  }
}