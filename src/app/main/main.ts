import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class MainComponent implements OnInit {
  userName: string = 'Usuario';
  userInitial: string = 'U';

  categories = [
    { name: 'Panadería Artesanal', icon: '🥖', count: '24 items', bg: '#fef3c7' },
    { name: 'Pastelería & Tortas', icon: '🎂', count: '18 items', bg: '#fce7f3' },
    { name: 'Café & Bebidas', icon: '☕', count: '15 items', bg: '#e0e7ff' },
    { name: 'Empanadas & Salados', icon: '🥟', count: '12 items', bg: '#ffedd5' }
  ];

  featuredProducts = [
    { name: 'Croissant Mantequilla', price: '$1.800', rating: '4.9', image: '🥐', tag: 'Popular' },
    { name: 'Capuchino Italiano 12oz', price: '$2.500', rating: '4.8', image: '☕', tag: 'Destacado' },
    { name: 'Torta Hojarasca Manjar', price: '$18.900', rating: '5.0', image: '🍰', tag: 'Top Ventas' },
    { name: 'Empanada Pino Horno', price: '$2.200', rating: '4.7', image: '🥟', tag: 'Clásico' }
  ];

  constructor(
    private msalService: MsalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.userName = accounts[0].name || accounts[0].username || 'Usuario';
      this.userInitial = this.userName.charAt(0).toUpperCase();
    }
  }

  logout(): void {
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200/login'
    });
  }
}