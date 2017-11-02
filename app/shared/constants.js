export const baseEndpoint = location.hostname === '127.0.0.1'
  ? 'http://localhost:8080' : 'http://v2beta.tryoratio.com';
export const devMode = ['127.0.0.1', 'localhost'].includes(location.hostname);
export const endpoint = `${baseEndpoint}/mobileapp/v2`;
export const apiKey = 'xXtyq13@94v8+&&1n194no2b3nsov94';
