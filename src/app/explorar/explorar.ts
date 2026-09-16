import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart';

@Component({
  selector: 'app-explorar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './explorar.html',
  styleUrl: './explorar.css'
})
export class ExplorarComponent {
  terminoBusqueda: string = '';
  categoriaActiva: string = 'Todos';

  categorias = ['Todos', 'Panadería', 'Cafetería', 'Pastelería', 'Bebidas'];

  productos = [
    { id: 1, name: 'Baguette Rústica Madre', category: 'Panadería', price: '$1.500', rating: '4.9', image: '🥖', tag: 'Artesanal', desc: 'Fermentación natural de 24 horas, crujiente y dorada.' },
    { id: 2, name: 'Croissant de Almendras', category: 'Pastelería', price: '$2.200', rating: '5.0', image: '🥐', tag: 'Especialidad', desc: 'Relleno de frangipane y cubierto con almendras tostadas.' },
    { id: 3, name: 'Iced Latte Caramelo', category: 'Cafetería', price: '$2.800', rating: '4.7', image: '🧋', tag: 'Frío', desc: 'Espresso doble, leche fría y jarabe de caramelo artesanal.' },
    { id: 4, name: 'Kuchen de Nuez Tradicional', category: 'Pastelería', price: '$16.500', rating: '4.8', image: '🥮', tag: 'Tradicional', desc: 'Receta alemana familiar con nueces seleccionadas.' },
    { id: 5, name: 'Café Espresso Doble', category: 'Cafetería', price: '$1.900', rating: '4.9', image: '☕', tag: 'Popular', desc: 'Granos de especialidad tostados en origen.' },
    { id: 6, name: 'Pan de Molde Integral', category: 'Panadería', price: '$2.400', rating: '4.6', image: '🍞', tag: 'Saludable', desc: 'Con semillas de girasol, lino y sésamo.' },
    { id: 7, name: 'Torta Tres Leches', category: 'Pastelería', price: '$18.900', rating: '4.9', image: '🍰', tag: 'Favorito', desc: 'Bizcocho húmedo bañado en mezcla especial y merengue.' },
    { id: 8, name: 'Jugo Natural de Frambuesa', category: 'Bebidas', price: '$2.500', rating: '4.8', image: '🧃', tag: 'Refrescante', desc: '100% natural exprimido al momento sin azúcar añadida.' }
  ];

  constructor(private cartService: CartService) {}

  get productosFiltrados() {
    return this.productos.filter(p => {
      const coincideCat = this.categoriaActiva === 'Todos' || p.category === this.categoriaActiva;
      const coincideTexto = p.name.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) || 
                            p.desc.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
      return coincideCat && coincideTexto;
    });
  }

  filtrarPorCategoria(cat: string) {
    this.categoriaActiva = cat;
  }

  agregarAlCarrito(prod: any) {
    this.cartService.agregarProducto(prod);
    alert(`🛒 ¡${prod.name} agregado al carrito!`);
  }
}