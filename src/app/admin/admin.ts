import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent {
  productosAdmin = [
    { id: 1, name: 'Baguette Rústica Madre', price: '$1.500', stock: 24, status: 'Activo' },
    { id: 2, name: 'Croissant Almendras', price: '$2.200', stock: 15, status: 'Activo' },
    { id: 3, name: 'Iced Latte Caramelo', price: '$2.800', stock: 30, status: 'Activo' },
    { id: 4, name: 'Kuchen de Nuez', price: '$16.500', stock: 5, status: 'Poco stock' }
  ];
}