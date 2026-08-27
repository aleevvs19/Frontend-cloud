import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');

  constructor(
    private msalService: MsalService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.msalService.instance.initialize();

    const response = await this.msalService.instance.handleRedirectPromise();

    if (response) {
      // Establece la cuenta e ingresa al Inicio (main)
      this.msalService.instance.setActiveAccount(response.account);
      this.router.navigate(['/main']);
    } else {
      // Mantiene la sesión si el usuario recarga la página
      const accounts = this.msalService.instance.getAllAccounts();
      if (accounts.length > 0) {
        this.msalService.instance.setActiveAccount(accounts[0]);
      }
    }
  }
}