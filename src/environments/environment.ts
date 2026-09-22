export const environment = {
  production: false,
  apiUrl: 'http://54.197.16.20/api', // Apunta a la nueva IP del backend en AWS
  entraScope: 'api://501e8863-bd34-48ca-98ad-2c8ff1f8873d/Ale-Pedidos360',
  apiUris: [
    'http://localhost:8080/*',
    'http://54.197.16.20/*',
    'https://54.197.16.20/*'
  ]
};