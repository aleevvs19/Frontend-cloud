import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  constructor(
    private msalService: MsalService,
    private router: Router
  ) {}

  // Login tradicional
  onLogin(): void {
    this.router.navigate(['/main']);
  }

  // Login con Microsoft Azure AD
  async loginWithMSAL(): Promise<void> {
    try {
      await this.msalService.instance.initialize();

      this.msalService.loginPopup().subscribe({
        next: (result: AuthenticationResult) => {
          if (result && result.account) {
            this.msalService.instance.setActiveAccount(result.account);
            this.router.navigate(['/main']);
          }
        },
        error: (err) => console.error('Error durante la autenticación:', err)
      });
    } catch (error) {
      console.error('Error al inicializar MSAL:', error);
    }
  }
}