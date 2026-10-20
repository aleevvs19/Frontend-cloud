
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router
} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { CartService } from '../cart';
import { environment } from '../../environments/environment';

// Producto recibido desde Spring Boot
interface ProductoBackend {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  sucursalId: number;
}

// Producto mostrado en Angular
interface ProductoVista {
  productoId: number;
  sucursalId: number;
  name: string;
  price: string;
  stock: number;
  image: string;
  tag: string;
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class MainComponent implements OnInit {

  userName: string = 'Usuario';
  userInitial: string = 'U';
  cantidadCarrito: number = 0;
  esAdmin: boolean = false;

  cargandoProductos: boolean = false;
  errorProductos: string = '';

  categories = [
    {
      name: 'Panadería Artesanal',
      count: '12 locales',
      icon: '🍞',
      bg: '#fef3c7'
    },
    {
      name: 'Cafetería de Especialidad',
      count: '8 locales',
      icon: '☕',
      bg: '#fce7f3'
    },
    {
      name: 'Pastelería & Postres',
      count: '10 locales',
      icon: '🍰',
      bg: '#e0e7ff'
    },
    {
      name: 'Bebidas & Refrescos',
      count: '6 locales',
      icon: '🧋',
      bg: '#d1fae5'
    }
  ];

  // Productos obtenidos desde Spring Boot
  featuredProducts: ProductoVista[] = [];

  constructor(
    private msalService: MsalService,
    public router: Router,
    private cartService: CartService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // Obtener usuario autenticado con Microsoft
    const accounts = this.msalService.instance.getAllAccounts();

    if (accounts.length > 0) {

      this.userName =
        accounts[0].name ||
        accounts[0].username ||
        'Usuario';

      this.userInitial = this.userName.charAt(0).toUpperCase();

      const correoUsuario = accounts[0].username.toLowerCase();

      // Control visual del panel de administración
      if (
        correoUsuario.includes('ale.salazarv') ||
        correoUsuario.includes('admin')
      ) {
        this.esAdmin = true;
      }
    }

    // Mantener actualizado el contador del carrito
    this.cartService.count$.subscribe(count => {
      this.cantidadCarrito = count;
      this.cdr.detectChanges();
    });

    // Consultar productos al iniciar
    this.cargarProductos();
  }

  cargarProductos(): void {

    const urlBackend = `${environment.apiUrl}/productos`;

    this.cargandoProductos = true;
    this.errorProductos = '';

    this.http.get<ProductoBackend[]>(urlBackend).subscribe({

      next: (productos) => {

        this.featuredProducts = productos.map(producto => {

          const nombre = producto.nombre.toLowerCase();

          let imagen = '🛍️';
          let etiqueta = 'Producto';

          if (nombre.includes('baguette')) {

            imagen = '🥖';
            etiqueta = 'Artesanal';

          } else if (nombre.includes('croissant')) {

            imagen = '🥐';
            etiqueta = 'Especialidad';

          } else if (nombre.includes('latte')) {

            imagen = '🧋';
            etiqueta = 'Frío';

          } else if (nombre.includes('kuchen')) {

            imagen = '🥮';
            etiqueta = 'Tradicional';

          } else if (nombre.includes('café')) {

            imagen = '☕';
            etiqueta = 'Cafetería';
          }

          return {
            productoId: producto.id,
            sucursalId: producto.sucursalId,
            name: producto.nombre,
            price: '$' + Number(producto.precio).toLocaleString('es-CL'),
            stock: producto.stock,
            image: imagen,
            tag: etiqueta
          };
        });

        this.cargandoProductos = false;
        this.errorProductos = '';

        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error('Error al cargar productos:', err);

        this.cargandoProductos = false;

        this.errorProductos =
          `No se pudieron cargar los productos. Error HTTP: ${err.status}`;

        this.cdr.detectChanges();
      }
    });
  }

  // Agregar un producto al carrito
  agregarAlCarrito(prod: ProductoVista): void {

    // Validar stock disponible
    if (prod.stock <= 0) {
      alert('Este producto no tiene stock disponible.');
      return;
    }

    const productosActuales =
      this.cartService.obtenerProductos();

    // Evitar mezclar productos de distintas sucursales
    if (
      productosActuales.length > 0 &&
      productosActuales.some(
        (item: any) => item.sucursalId !== prod.sucursalId
      )
    ) {
      alert(
        'No puedes mezclar productos de distintas sucursales en un mismo pedido.'
      );
      return;
    }

    // Guardar producto en el carrito
    this.cartService.agregarProducto(prod);

    // Actualizar la interfaz
    this.cdr.detectChanges();
  }

  // Abrir carrito
  irAlCarrito(): void {
    this.router.navigate(['/main/carrito']);
  }

  // Abrir panel de administración
  irAlAdmin(): void {
    this.router.navigate(['/main/admin']);
  }

  // Cerrar sesión de Microsoft
  logout(): void {
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200/login'
    });
  }
}
