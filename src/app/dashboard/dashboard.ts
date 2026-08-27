import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  kpis = [
    { title: 'Pedidos Hoy', value: '142', icon: '📦', detail: '+12% vs ayer', positive: true },
    { title: 'Ventas Totales', value: '$1.450.000', icon: '💰', detail: '+8% vs ayer', positive: true },
    { title: 'En Preparación', value: '18', icon: '⏳', detail: 'Atención requerida', positive: false },
    { title: 'Sucursales Activas', value: '20 / 20', icon: '🏪', detail: '100% Operativo', positive: true }
  ];

  recentOrders = [
    { id: '#P-3091', branch: 'Sucursal Providencia', items: '25x Marraquetas, 10x Empanadas', total: '$45.000', status: 'Completado', badgeClass: 'badge-success' },
    { id: '#P-3090', branch: 'Santiago Centro', items: '15x Croissants, 5x Café', total: '$28.500', status: 'En Camino', badgeClass: 'badge-info' },
    { id: '#P-3089', branch: 'Sucursal Las Condes', items: '40x Baguettes, 20x Donuts', total: '$62.000', status: 'Preparando', badgeClass: 'badge-warning' },
    { id: '#P-3088', branch: 'Sucursal Maipú', items: '50x Hallullas', total: '$18.000', status: 'Pendiente', badgeClass: 'badge-danger' }
  ];
}