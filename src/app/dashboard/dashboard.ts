import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  pedidosRecientes: any[] = [];
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.obtenerPedidosDelBackend();
  }

  obtenerPedidosDelBackend() {
    // Construye la URL dinámica usando el environment (Localhost o AWS EC2)
    const urlBackend = `${environment.apiUrl}/pedidos`;

    // Esta petición GET activará el interceptor de MSAL para inyectar el Token Bearer automáticamente
    this.http.get<any[]>(urlBackend).subscribe({
      next: (data) => {
        this.pedidosRecientes = data;
        this.isLoading = false;
        console.log('Pedidos obtenidos exitosamente del backend:', data);
      },
      error: (err) => {
        console.error('Error al conectar con el backend para los pedidos:', err);
        this.isLoading = false;
      }
    });
  }

  verTodosPedidos() {
    // Si tienes una ruta específica para todos los pedidos, puedes redirigir:
    // this.router.navigate(['/mis-pedidos']);
    alert('📋 Abriendo listado completo de transacciones y auditoría operacional.');
  }

  reabastecerInsumo(insumo: string) {
    alert(`📦 Generando orden de reposición prioritaria para: ${insumo}`);
  }

  volverATienda() {
    this.router.navigate(['/main']);
  }
}