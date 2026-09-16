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
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'main', 
    component: MainComponent, 
    canActivate: [MsalGuard],
    children: [
      { path: 'explorar', component: ExplorarComponent },
      { path: 'sucursales', component: SucursalesComponent },
      { path: 'mis-pedidos', component: MisPedidosComponent },
      { path: 'carrito', component: CarritoComponent },
      { path: 'admin', component: AdminComponent }
    ]
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [MsalGuard] 
  },
  //{ path: '**', redirectTo: 'login' }
];