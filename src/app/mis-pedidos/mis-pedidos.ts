import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-pedidos.html',
  styleUrl: './mis-pedidos.css'
})
export class MisPedidosComponent {
  // Lista ficticia de pedidos para poblar la vista
  misPedidos = [
    {
      id: 'P360-9082',
      fecha: '16 Septiembre 2026',
      total: '$8.500',
      estado: 'En camino 🚚',
      colorEstado: '#dbeafe', // Azul clarito
      textoEstado: '#1e40af', // Azul oscuro
      items: ['2x Croissant Almendras', '1x Iced Latte Caramelo']
    },
    {
      id: 'P360-8755',
      fecha: '14 Septiembre 2026',
      total: '$4.500',
      estado: 'Entregado ✅',
      colorEstado: '#d1fae5', // Verde clarito
      textoEstado: '#065f46', // Verde oscuro
      items: ['3x Baguette Rústica Madre']
    },
    {
      id: 'P360-8112',
      fecha: '10 Septiembre 2026',
      total: '$16.500',
      estado: 'Entregado ✅',
      colorEstado: '#d1fae5',
      textoEstado: '#065f46',
      items: ['1x Kuchen de Nuez']
    }
  ];

  verDetalle(id: string) {
    alert(`Mostrando boleta y detalles del pedido: ${id}`);
  }
}