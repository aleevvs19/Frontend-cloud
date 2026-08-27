import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class MainComponent implements OnInit {
  userName: string = 'Usuario';
  userEmail: string = '';

  constructor(
    private msalService: MsalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const activeAccount = this.msalService.instance.getActiveAccount();
    if (activeAccount) {
      this.userName = activeAccount.name || 'Usuario Corporativo';
      this.userEmail = activeAccount.username || '';
    }
  }

  logout(): void {
    // 1. Limpia la cuenta activa local
    this.msalService.instance.setActiveAccount(null);

    // 2. Ejecuta el cierre de sesión mediante redirección (sin popups bloqueados)
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200/login'
    });
  }
}