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
    this.router.navigate(['/main/dashboard']);
  }

  async loginWithMSAL(): Promise<void> {
    await this.msalService.instance.initialize();
    this.msalService.loginRedirect({
      scopes: ['user.read']
    });
  }
}