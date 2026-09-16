import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {
  productosAdmin = [
    { id: 1, name: 'Baguette Rústica Madre', price: '$1.500', stock: 24, status: 'Activo' },
    { id: 2, name: 'Croissant Almendras', price: '$2.200', stock: 15, status: 'Activo' },
    { id: 3, name: 'Iced Latte Caramelo', price: '$2.800', stock: 30, status: 'Activo' },
    { id: 4, name: 'Kuchen de Nuez', price: '$16.500', stock: 5, status: 'Poco stock' }
  ];

  constructor(private msalService: MsalService, private router: Router) {}

  ngOnInit() {
    // 1. BLINDAJE INFALIBLE
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      const correo = accounts[0].username.toLowerCase();
      
      // ✅ SI EL CORREO NO TIENE TU USUARIO Y NO TIENE 'ADMIN', LO BLOQUEA
      if (!correo.includes('ale.salazarv') && !correo.includes('admin')) {
        alert('Acceso Denegado 🛑: Área exclusiva para administradores.');
        this.router.navigate(['/main']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  // 2. FUNCIONES DE LOS BOTONES
  nuevoProducto() {
    const nombre = prompt('Ingresa el nombre del nuevo producto:');
    if (!nombre) return; 

    const precio = prompt('Ingresa el precio (ej. $2.000):');
    if (!precio) return;

    const stock = prompt('Ingresa el stock inicial:', '10');

    const nuevoId = this.productosAdmin.length > 0 ? Math.max(...this.productosAdmin.map(p => p.id)) + 1 : 1;
    this.productosAdmin.push({
      id: nuevoId, 
      name: nombre, 
      price: precio,
      stock: parseInt(stock || '0', 10), 
      status: 'Activo'
    });
  }

  editarProducto(producto: any) {
    const nuevoNombre = prompt('Modifica el nombre del producto:', producto.name);
    if (!nuevoNombre) return;

    const nuevoPrecio = prompt('Modifica el precio:', producto.price);
    if (!nuevoPrecio) return;

    const index = this.productosAdmin.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      this.productosAdmin[index].name = nuevoNombre;
      this.productosAdmin[index].price = nuevoPrecio;
    }
  }

  eliminarProducto(id: number) {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar este producto permanentemente? 🗑️');
    if (confirmar) {
      this.productosAdmin = this.productosAdmin.filter(p => p.id !== id);
    }
  }
}