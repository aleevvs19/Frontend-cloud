
export const environment = {
  production: false,

  // API Gateway Nginx ejecutándose localmente
  apiUrl: 'http://localhost/api',

  // Scope de Microsoft Entra ID
  entraScope: 'api://501e8863-bd34-48ca-98ad-2c8ff1f8873d/Ale-Pedidos360',

  // Rutas protegidas por Microsoft Entra ID
  apiUris: [
    'http://localhost/api/pedidos/*',
    'http://localhost/api/notificaciones/*'
  ]
};
