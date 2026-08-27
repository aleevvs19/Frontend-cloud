import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  stats = [
    { label: 'Pedidos Hoy', value: '142', change: '+12% vs ayer', positive: true, icon: '📦', color: '#eff6ff', iconColor: '#2563eb' },
    { label: 'Ventas Totales', value: '$1.450.000', change: '+8% vs ayer', positive: true, icon: '💰', color: '#ecfdf5', iconColor: '#059669' },
    { label: 'En Preparación', value: '18', change: 'Atención requerida', positive: false, icon: '⏳', color: '#fffbeb', iconColor: '#d97706' },
    { label: 'Sucursales Activas', value: '20 / 20', change: '100% Operativo', positive: true, icon: '🏪', color: '#f3e8ff', iconColor: '#7c3aed' }
  ];

  recentOrders = [
    { id: '#P-3091', branch: 'Sucursal Providencia', detail: '25x Marraquetas, 10x Empanadas', total: '$45.000', status: 'Completado', statusClass: 'st-completed' },
    { id: '#P-3090', branch: 'Santiago Centro', detail: '15x Croissants, 5x Café', total: '$28.500', status: 'En Camino', statusClass: 'st-shipping' },
    { id: '#P-3089', branch: 'Sucursal Las Condes', detail: '40x Baguettes, 20x Donuts', total: '$62.000', status: 'Preparando', statusClass: 'st-preparing' },
    { id: '#P-3088', branch: 'Sucursal Maipú', detail: '50x Hallullas', total: '$18.000', status: 'Pendiente', statusClass: 'st-pending' }
  ];

  inventoryAlerts = [
    { title: 'Harina de Trigo Especial', desc: 'Stock crítico en Sucursal Ñuñoa (12kg restantes)', level: 'CRÍTICO' },
    { title: 'Mantequilla repostera', desc: 'Reabastecer en Centro de Distribución', level: 'ADVERTENCIA' }
  ];
}