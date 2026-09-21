export const environment = {
  production: false,
  apiUrl: 'http://100.50.157.1/api', // Apunta al puerto 80 de Nginx
  entraScope: 'api://501e8863-bd34-48ca-98ad-2c8ff1f8873d/Ale-Pedidos360',
  apiUris: [
    'http://localhost:8080/*',
    'http://100.50.157.1/*',       // Cubre Nginx
    'http://100.50.157.1:8080/*'
  ]
};