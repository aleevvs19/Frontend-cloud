import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-pedidos.html',
  styleUrl: './mis-pedidos.css'
})
export class MisPedidosComponent implements OnInit {
  misPedidos: any[] = [];
  cargando: boolean = true;

  ngOnInit(): void {
    // Simulamos que va a buscar a la EC2 en AWS y tarda 1.5 segundos
    setTimeout(() => {
      this.cargarDatosFicticios();
      this.cargando = false;
    }, 1500);
  }

  verDetalle(id: string) {
    alert(`Mostrando boleta y detalles del pedido: ${id}`);
  }

  cargarDatosFicticios() {
    this.misPedidos = [
      {
        id: 'P360-9082',
        fecha: '16 Septiembre 2026',
        total: '$8.500',
        estado: 'En camino 🚚',
        colorEstado: '#dbeafe',
        textoEstado: '#1e40af',
        items: ['2x Croissant Almendras', '1x Iced Latte Caramelo']
      },
      {
        id: 'P360-8755',
        fecha: '14 Septiembre 2026',
        total: '$4.500',
        estado: 'Entregado ✅',
        colorEstado: '#d1fae5',
        textoEstado: '#065f46',
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
  }
}