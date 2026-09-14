import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sucursales',
  standalone: true,
  imports: [CommonModule],
  template: `<div style="padding: 30px;"><h2>📍 Nuestras Sucursales</h2><p>Encuentra el local de Pedidos360 más cercano a ti.</p></div>`,
  styleUrls: []
})
export class SucursalesComponent {}