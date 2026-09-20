import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';

import {
  provideRouter
} from '@angular/router';

import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { routes } from './app.routes';

import {
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  Configuration,
  IPublicClientApplication
} from '@azure/msal-browser';

import {
  MsalService,
  MsalGuard,
  MsalBroadcastService,
  MsalInterceptor,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration
} from '@azure/msal-angular';

/*
 * ============================================================
 * CONFIGURACIÓN DE LA API
 * ============================================================
 *
 * Estos dos valores deben ser reemplazados cuando tu compañero
 * entregue los datos reales de la API.
 */

const API_URL = 'https://TU-API-GATEWAY-AQUI';

const API_SCOPE = 'api://TU-API-CLIENT-ID/access_as_user';


/*
 * ============================================================
 * CONFIGURACIÓN MSAL
 * ============================================================
 */

export const msalConfig: Configuration = {

  auth: {

    clientId: '501e8863-bd34-48ca-98ad-2c8ff1f8873d',

    authority:
      'https://login.microsoftonline.com/8e80f94c-2366-4206-8648-dd4a63286b84',

    redirectUri: 'http://localhost:4200',

    postLogoutRedirectUri: 'http://localhost:4200'
  },

  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage
  }
};


/*
 * ============================================================
 * MSAL INSTANCE
 * ============================================================
 */

export function MSALInstanceFactory(): IPublicClientApplication {

  return new PublicClientApplication(msalConfig);

}


/*
 * ============================================================
 * MSAL GUARD
 * ============================================================
 *
 * El Guard solamente necesita autenticar al usuario.
 *
 * La API solicitará su scope cuando hagamos una petición
 * protegida mediante MsalInterceptor.
 */

export function MSALGuardConfigFactory(): MsalGuardConfiguration {

  return {

    interactionType: InteractionType.Redirect,

    authRequest: {
      scopes: [
        'User.Read'
      ]
    },

    loginFailedRoute: '/login'
  };

}


/*
 * ============================================================
 * MSAL INTERCEPTOR
 * ============================================================
 *
 * Cuando Angular realice una petición cuya URL coincida
 * con API_URL, MsalInterceptor solicitará el Access Token
 * correspondiente y lo enviará como:
 *
 * Authorization: Bearer <token>
 */

export function MSALInterceptorConfigFactory():
  MsalInterceptorConfiguration {

  const protectedResourceMap =
    new Map<string, Array<string>>();

  protectedResourceMap.set(
    `${API_URL}/*`,
    [
      API_SCOPE
    ]
  );

  return {

    interactionType: InteractionType.Redirect,

    protectedResourceMap

  };

}


/*
 * ============================================================
 * CONFIGURACIÓN PRINCIPAL DE ANGULAR
 * ============================================================
 */

export const appConfig: ApplicationConfig = {

  providers: [

    provideZoneChangeDetection({
      eventCoalescing: true
    }),

    provideRouter(routes),

    provideHttpClient(
      withInterceptorsFromDi()
    ),

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
      useFactory: MSALInterceptorConfigFactory
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },

    MsalService,

    MsalGuard,

    MsalBroadcastService

  ]

};