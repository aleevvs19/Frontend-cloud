import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sucursales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sucursales.html',
  styleUrl: './sucursales.css'
})
export class SucursalesComponent {
  sucursalSeleccionada: string = 'Providencia';

  listaSucursales = [
    {
      id: 'providencia',
      name: 'Sucursal Providencia',
      address: 'Av. Providencia 1234, Santiago',
      hours: 'Lun a Sáb: 08:00 - 20:00 hrs',
      icon: '🥐',
      badge: 'Principal',
      status: 'Abierto ahora'
    },
    {
      id: 'santiago',
      name: 'Santiago Centro',
      address: 'Huérfanos 1040, Santiago Centro',
      hours: 'Lun a Dom: 09:00 - 19:00 hrs',
      icon: '☕',
      badge: 'Alta demanda',
      status: 'Abierto ahora'
    },
    {
      id: 'lascondes',
      name: 'Sucursal Las Condes',
      address: 'Av. Vitacura 3400, Las Condes',
      hours: 'Lun a Sáb: 07:30 - 21:00 hrs',
      icon: '🍰',
      badge: 'Especialidad',
      status: 'Abierto ahora'
    },
    {
      id: 'maipu',
      name: 'Sucursal Maipú',
      address: 'Av. Pajaritos 2500, Maipú',
      hours: 'Lun a Sáb: 08:00 - 20:00 hrs',
      icon: '🥖',
      badge: 'Nuevo',
      status: 'Abierto ahora'
    }
  ];

  seleccionarSucursal(sucursal: any) {
    this.sucursalSeleccionada = sucursal.name;
    alert(`📍 ¡Has seleccionado la ${sucursal.name} como tu local preferido para retiro!`);
  }
}