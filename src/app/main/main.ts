import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router
} from '@angular/router';

import { MsalService } from '@azure/msal-angular';
import { CartService } from '../cart';

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

  // Estado visual de administración.
  // Más adelante se validará mediante el rol/claim real
  // entregado por Microsoft Entra ID.
  esAdmin: boolean = false;

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

  featuredProducts = [
    {
      name: 'Baguette Rústica Madre',
      price: '$1.500',
      rating: '4.9',
      image: '🥖',
      tag: 'Artesanal'
    },
    {
      name: 'Croissant Almendras',
      price: '$2.200',
      rating: '5.0',
      image: '🥐',
      tag: 'Especialidad'
    },
    {
      name: 'Iced Latte Caramelo',
      price: '$2.800',
      rating: '4.7',
      image: '🧋',
      tag: 'Frío'
    },
    {
      name: 'Kuchen de Nuez',
      price: '$16.500',
      rating: '4.8',
      image: '🥮',
      tag: 'Tradicional'
    }
  ];

  constructor(
    private msalService: MsalService,
    public router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {

    /*
     * Obtener el usuario autenticado desde MSAL.
     */
    const accounts = this.msalService.instance.getAllAccounts();

    if (accounts.length > 0) {

      const account = accounts[0];

      this.userName =
        account.name ||
        account.username ||
        'Usuario';

      this.userInitial =
        this.userName.charAt(0).toUpperCase();

      /*
       * IMPORTANTE:
       *
       * No determinamos el rol de administrador
       * utilizando el correo electrónico.
       *
       * La validación real deberá hacerse posteriormente
       * mediante los claims/roles del token de Microsoft Entra ID.
       */
      this.esAdmin = false;
    }

    /*
     * Escuchar cambios en la cantidad del carrito.
     */
    this.cartService.count$.subscribe(count => {
      this.cantidadCarrito = count;
    });
  }

  /*
   * Agregar producto al carrito.
   */
  agregarAlCarrito(prod: any): void {
    this.cartService.agregarProducto(prod);
  }

  /*
   * Ir al carrito.
   */
  irAlCarrito(): void {
    this.router.navigate(['/main/carrito']);
  }

  /*
   * Ir al panel de administración.
   */
  irAlAdmin(): void {
    this.router.navigate(['/main/admin']);
  }

  /*
   * Cerrar sesión de Microsoft Entra ID.
   */
  logout(): void {
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200/login'
    });
  }
}