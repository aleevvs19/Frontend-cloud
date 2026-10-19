
export const environment = {
  production: false,

  apiUrl: 'http://localhost/api',

  entraScope: 'api://501e8863-bd34-48ca-98ad-2c8ff1f8873d/Ale-Pedidos360',

  apiUris: [
    'http://localhost/api/pedidos',
    'http://localhost/api/pedidos/*',

    'http://localhost/api/productos',
    'http://localhost/api/productos/*',

    'http://localhost/api/notificaciones',
    'http://localhost/api/notificaciones/*'
  ]
};
