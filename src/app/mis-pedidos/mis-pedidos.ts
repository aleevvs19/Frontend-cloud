
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

// Estructura de los detalles recibidos desde Spring Boot
interface DetallePedidoBackend {
  nombreProducto: string;
  cantidad: number;
}

// Estructura del pedido recibido desde Spring Boot
interface PedidoBackend {
  id: number;
  fechaCreacion: string;
  total: number;
  estado: string;
  detalles: DetallePedidoBackend[];
}

// Estructura utilizada para mostrar los pedidos en Angular
interface PedidoVista {
  id: string;
  fecha: string;
  total: string;
  estado: string;
  colorEstado: string;
  textoEstado: string;
  items: string[];
}

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-pedidos.html',
  styleUrl: './mis-pedidos.css'
})
export class MisPedidosComponent implements OnInit {

  misPedidos: PedidoVista[] = [];
  cargando: boolean = true;
  errorCarga: string = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  // Obtener los pedidos del usuario autenticado con Microsoft
  cargarPedidos(): void {

    const urlBackend =
      `${environment.apiUrl}/pedidos/mis-pedidos`;

    this.cargando = true;
    this.errorCarga = '';

    this.http.get<PedidoBackend[]>(urlBackend).subscribe({

      next: (pedidos) => {

        // Ordenar los pedidos más recientes primero
        const pedidosOrdenados = [...pedidos].sort(
          (a, b) => b.id - a.id
        );

        this.misPedidos = pedidosOrdenados.map(pedido => {

          let estado = pedido.estado;
          let colorEstado = '#fef3c7';
          let textoEstado = '#92400e';

          // Convertir el estado de Spring Boot a texto visual
          switch (pedido.estado) {

            case 'RECEPCIONADO':
              estado = 'Recepcionado 📦';
              break;

            case 'PREPARANDO':
              estado = 'Preparando 👨‍🍳';
              break;

            case 'DESPACHADO':
              estado = 'En camino 🚚';
              colorEstado = '#dbeafe';
              textoEstado = '#1e40af';
              break;

            case 'ENTREGADO':
              estado = 'Entregado ✅';
              colorEstado = '#d1fae5';
              textoEstado = '#065f46';
              break;

            case 'CANCELADO':
              estado = 'Cancelado ❌';
              colorEstado = '#fee2e2';
              textoEstado = '#991b1b';
              break;
          }

          // Formatear fecha
          const fecha = pedido.fechaCreacion
            ? new Date(pedido.fechaCreacion)
                .toLocaleDateString('es-CL')
            : 'Fecha no disponible';

          // Obtener productos y cantidades del pedido
          const items = (pedido.detalles ?? []).map(
            detalle =>
              `${detalle.cantidad}x ${detalle.nombreProducto}`
          );

          return {
            id: `P360-${pedido.id}`,
            fecha,
            total: '$' +
              Number(pedido.total).toLocaleString('es-CL'),
            estado,
            colorEstado,
            textoEstado,
            items
          };
        });

        // Finalizar carga
        this.cargando = false;
        this.errorCarga = '';

        console.log(
          'Historial de pedidos cargado correctamente'
        );

        // Actualizar la vista de Angular
        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error(
          'Error al cargar los pedidos:',
          err
        );

        this.misPedidos = [];
        this.cargando = false;

        if (err.status === 401) {
          this.errorCarga =
            'Tu sesión no está autorizada. Inicia sesión nuevamente.';

        } else if (err.status === 403) {
          this.errorCarga =
            'No tienes permisos para consultar estos pedidos.';

        } else if (err.status === 404) {
          this.errorCarga =
            'La ruta de Mis Pedidos no está disponible en el backend.';

        } else {
          this.errorCarga =
            `No se pudieron cargar los pedidos. Error HTTP: ${err.status}`;
        }

        this.cdr.detectChanges();
      }
    });
  }

  // Acción temporal para visualizar un pedido
  verDetalle(id: string): void {
    alert(`Pedido seleccionado: ${id}`);
  }
}
