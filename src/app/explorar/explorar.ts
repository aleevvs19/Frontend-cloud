import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart'; // <-- Corregido aquí

@Component({
  selector: 'app-explorar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explorar.html',
  styleUrl: './explorar.css'
})
export class ExplorarComponent {
  searchTerm: string = '';

  productos = [
    { name: 'Baguette Rústica Madre', price: '$1.500', rating: '4.9', image: '🥖', tag: 'Artesanal' },
    { name: 'Croissant Almendras', price: '$2.200', rating: '5.0', image: '🥐', tag: 'Especialidad' },
    { name: 'Iced Latte Caramelo', price: '$2.800', rating: '4.7', image: '🧋', tag: 'Frío' },
    { name: 'Kuchen de Nuez', price: '$16.500', rating: '4.8', image: '🥮', tag: 'Tradicional' }
  ];

  productosFiltrados = [...this.productos];

  constructor(private cartService: CartService) {}

  onSearchInput(event: any) {
    this.searchTerm = event.target.value;
  }

  filtrar() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.productosFiltrados = [...this.productos];
    } else {
      this.productosFiltrados = this.productos.filter(p =>
        p.name.toLowerCase().includes(term) || p.tag.toLowerCase().includes(term)
      );
    }
  }

  agregarAlCarrito(prod: any) {
    this.cartService.agregarProducto(prod);
  }
}