import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  constructor(
    private router: Router,
    private msalService: MsalService
  ) {}

  onLogin(): void {
    this.loginWithMSAL();
  }

  async loginWithMSAL(): Promise<void> {
    try {
      await this.msalService.instance.initialize();

      await this.msalService.loginRedirect({
        scopes: [
          'User.Read'
        ]
      });

    } catch (error) {
      console.error(
        'Error al iniciar sesión con Microsoft Entra ID:',
        error
      );
    }
  }
}