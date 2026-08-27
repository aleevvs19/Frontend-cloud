import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { 
  PublicClientApplication, 
  InteractionType, 
  BrowserCacheLocation,
  Configuration 
} from '@azure/msal-browser';
import { 
  MsalService, 
  MsalGuard, 
  MsalBroadcastService, 
  MSAL_INSTANCE, 
  MSAL_GUARD_CONFIG, 
  MsalGuardConfiguration 
} from '@azure/msal-angular';

export const msalConfig: Configuration = {
  auth: {
    clientId: '501e8863-bd34-48ca-98ad-2c8ff1f8873d',
    authority: 'https://login.microsoftonline.com/8e80f94c-2366-4206-8648-dd4a63286b84',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200'
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage
  }
};

export function MSALInstanceFactory() {
  return new PublicClientApplication(msalConfig);
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ]
};