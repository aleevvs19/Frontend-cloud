import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

export type UserRole = 'Cliente' | 'Operador de Cocina' | 'Repartidor' | 'Administrador de Local' | 'Administrador General';
export type OrderStatus = 'Pendiente' | 'En Cocina' | 'Listo' | 'En Camino' | 'Entregado';

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  store: string;
  client: string;
  type: 'A Domicilio' | 'Retiro en Tienda';
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  createdAt: Date;
}

interface AuditLog {
  id: string;
  orderId: string;
  user: string;
  role: UserRole;
  action: string;
  timestamp: Date;
  store: string;
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class MainComponent {
  private router = inject(Router);

  // Filtros y Estados
  currentRole: UserRole = 'Administrador General';
  selectedStore: string = 'Todas (20 Locales)';

  stores: string[] = [
    'Todas (20 Locales)',
    'Café Central - Providencia',
    'Pan Artesanal - Macul',
    'Café Central - Santiago Centro',
    'Panadería Dulce Aroma - Las Condes',
    'Café Central - Viña del Mar'
  ];

  roles: UserRole[] = [
    'Administrador General',
    'Administrador de Local',
    'Operador de Cocina',
    'Repartidor',
    'Cliente'
  ];

  // Lista Activa de Pedidos
  orders: Order[] = [
    {
      id: 'PED-360-101',
      store: 'Pan Artesanal - Macul',
      client: 'Camila Rojas',
      type: 'A Domicilio',
      status: 'En Cocina',
      items: [
        { name: 'Pan de Masa Madre (1kg)', qty: 2, price: 3800 },
        { name: 'Café Cappuccino Grande', qty: 2, price: 3200 }
      ],
      total: 14000,
      createdAt: new Date(Date.now() - 15 * 60000)
    },
    {
      id: 'PED-360-102',
      store: 'Café Central - Providencia',
      client: 'Mateo Silva',
      type: 'Retiro en Tienda',
      status: 'Pendiente',
      items: [
        { name: 'Tarta de Frambuesa (8 porciones)', qty: 1, price: 18500 },
        { name: 'Espresso Doble', qty: 1, price: 2400 }
      ],
      total: 20900,
      createdAt: new Date(Date.now() - 5 * 60000)
    },
    {
      id: 'PED-360-103',
      store: 'Café Central - Santiago Centro',
      client: 'Andrea Morales',
      type: 'A Domicilio',
      status: 'Listo',
      items: [
        { name: 'Croissant Jamón Queso', qty: 3, price: 2900 },
        { name: 'Jugo Natural Naranja', qty: 2, price: 2800 }
      ],
      total: 14300,
      createdAt: new Date(Date.now() - 30 * 60000)
    }
  ];

  // Auditoría y Trazabilidad en Tiempo Real
  auditLogs: AuditLog[] = [
    {
      id: 'LOG-881',
      orderId: 'PED-360-101',
      user: 'cocina.macul@pedidos360.cl',
      role: 'Operador de Cocina',
      action: 'Cambio de estado: Pendiente ➔ En Cocina (Impresión de Comanda)',
      timestamp: new Date(Date.now() - 10 * 60000),
      store: 'Pan Artesanal - Macul'
    },
    {
      id: 'LOG-880',
      orderId: 'PED-360-101',
      user: 'camila.rojas@email.com',
      role: 'Cliente',
      action: 'Pedido Creado vía Web App (Descuento automático de stock básico)',
      timestamp: new Date(Date.now() - 15 * 60000),
      store: 'Pan Artesanal - Macul'
    }
  ];

  // Avance del ciclo de vida del pedido
  advanceOrderStatus(order: Order) {
    const statusOrder: OrderStatus[] = ['Pendiente', 'En Cocina', 'Listo', 'En Camino', 'Entregado'];
    const currentIndex = statusOrder.indexOf(order.status);
    
    if (currentIndex < statusOrder.length - 1) {
      const oldStatus = order.status;
      order.status = statusOrder[currentIndex + 1];

      this.auditLogs.unshift({
        id: `LOG-${Math.floor(100 + Math.random() * 900)}`,
        orderId: order.id,
        user: 'ale.salazarv@duocuc.cl',
        role: this.currentRole,
        action: `Estado actualizado: ${oldStatus} ➔ ${order.status}`,
        timestamp: new Date(),
        store: order.store
      });
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}