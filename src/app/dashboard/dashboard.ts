import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  constructor(private router: Router) {}

  pedidosRecientes = [
    { id: '#P-3091', sucursal: 'Sucursal Providencia', detalle: '25x Marraquetas, 10x Empanadas', total: '$45.000', estado: 'Completado', color: '#d1fae5', text: '#065f46' },
    { id: '#P-3090', sucursal: 'Santiago Centro', detalle: '15x Croissants, 5x Café', total: '$28.500', estado: 'En Camino', color: '#dbeafe', text: '#1e40af' },
    { id: '#P-3089', sucursal: 'Sucursal Las Condes', detalle: '40x Baguettes, 20x Donuts', total: '$62.000', estado: 'Preparando', color: '#fef3c7', text: '#b45309' },
    { id: '#P-3088', sucursal: 'Sucursal Maipú', detalle: '50x Hallullas', total: '$18.000', estado: 'Pendiente', color: '#fee2e2', text: '#991b1b' }
  ];

  verTodosPedidos() {
    alert('📋 Abriendo listado completo de transacciones y auditoría operacional.');
  }

  reabastecerInsumo(insumo: string) {
    alert(`📦 Generando orden de reposición prioritaria para: ${insumo}`);
  }

  volverATienda() {
    this.router.navigate(['/main']);
  }
}