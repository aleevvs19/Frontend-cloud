export const environment = {
  production: false,
  apiUrl: 'https://100.50.157.1/api', // Apunta al API Gateway (nginx) del frontend, vía HTTPS
  entraScope: 'api://501e8863-bd34-48ca-98ad-2c8ff1f8873d/Ale-Pedidos360',
  apiUris: [
    'https://100.50.157.1/api/pedidos/*',
    'https://100.50.157.1/api/notificaciones/*'
  ]
};