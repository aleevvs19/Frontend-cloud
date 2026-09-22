import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';

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
  MsalGuardConfiguration,
  MsalInterceptor,
  MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptorConfiguration
} from '@azure/msal-angular';

export const msalConfig: Configuration = {
  auth: {
    clientId: '501e8863-bd34-48ca-98ad-2c8ff1f8873d',
    authority: 'https://login.microsoftonline.com/8e80f94c-2366-4206-8648-dd4a63286b84',
    redirectUri: 'https://100.50.157.1',
    postLogoutRedirectUri: 'https://100.50.157.1'
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

// Configuración del Interceptor adaptada dinámicamente con el environment
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  
  // Mapea automáticamente todas las APIs declaradas en environment.ts con el scope de Entra ID
  environment.apiUris.forEach(uri => {
    protectedResourceMap.set(uri, [environment.entraScope]);
  });
  
  // Para leer el perfil de Microsoft del usuario
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), // Habilita las peticiones HTTP
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true // Registra el interceptor
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory // Aplica la configuración del interceptor
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ]
};