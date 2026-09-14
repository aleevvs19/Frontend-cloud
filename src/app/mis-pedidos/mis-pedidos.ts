import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule],
  template: `<div style="padding: 30px;"><h2>📦 Mis Pedidos</h2><p>Revisa el estado actual y el historial de tus pedidos.</p></div>`,
  styleUrls: []
})
export class MisPedidosComponent {}