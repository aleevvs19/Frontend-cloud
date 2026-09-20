import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

import { LoginComponent } from './login/login';
import { MainComponent } from './main/main';
import { DashboardComponent } from './dashboard/dashboard';
import { ExplorarComponent } from './explorar/explorar';
import { SucursalesComponent } from './sucursales/sucursales';
import { MisPedidosComponent } from './mis-pedidos/mis-pedidos';
import { CarritoComponent } from './carrito/carrito';
import { AdminComponent } from './admin/admin';

export const routes: Routes = [

  // Página inicial
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Login
  {
    path: 'login',
    component: LoginComponent
  },

  // Aplicación principal protegida por Microsoft Entra ID
  {
    path: 'main',
    component: MainComponent,
    canActivate: [MsalGuard],
    children: [

      // Dashboard
      {
        path: 'dashboard',
        component: DashboardComponent
      },

      // Explorar productos
      {
        path: 'explorar',
        component: ExplorarComponent
      },

      // Sucursales
      {
        path: 'sucursales',
        component: SucursalesComponent
      },

      // Mis pedidos
      {
        path: 'mis-pedidos',
        component: MisPedidosComponent
      },

      // Carrito
      {
        path: 'carrito',
        component: CarritoComponent
      },

      // Administración
      {
        path: 'admin',
        component: AdminComponent
      },

      // Si entran a /main, enviar al dashboard
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // Ruta alternativa al dashboard
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [MsalGuard]
  },

  // Cualquier ruta desconocida vuelve al login
  {
    path: '**',
    redirectTo: 'login'
  }

];