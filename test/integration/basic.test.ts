import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { MockExecuteFunctions } from '../mocks/MockExecuteFunctions';

/**
 * Este archivo contiene pruebas de integración que pueden habilitarse cuando sea necesario.
 * Están marcadas como "skip" por defecto porque necesitan credenciales de API reales.
 * 
 * Para ejecutar estas pruebas:
 * 1. Añade tu token de API de CloudBrowser en la variable CLOUD_BROWSER_API_TOKEN
 * 2. Quita el .skip de la función describe
 */

const CLOUD_BROWSER_API_TOKEN = 'your-api-token-here';

// Estas pruebas están desactivadas por defecto porque necesitan credenciales reales
describe.skip('CloudBrowser Node - Pruebas de Integración', () => {
  let mockExecuteFunctions: MockExecuteFunctions;

  beforeAll(() => {
    mockExecuteFunctions = new MockExecuteFunctions();

    // Configurar credenciales
    mockExecuteFunctions.setCredentials('cloudBrowserApi', {
      apiToken: CLOUD_BROWSER_API_TOKEN,
    });
  });

  afterAll(() => {
    // Limpiar recursos si es necesario
  });

  it('debería configurarse correctamente para obtener HTML', () => {
    // Configurar parámetros para la operación getHtml
    mockExecuteFunctions.setParameters({
      resource: 'content',
      operation: 'getHtml',
      url: 'https://example.com',
      navigationOptions: {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      },
      browserConfig: {
        headless: true,
        stealth: true,
      },
    });

    // Verificamos que los parámetros estén configurados correctamente
    const resource = mockExecuteFunctions.getNodeParameter('resource', 0);
    const operation = mockExecuteFunctions.getNodeParameter('operation', 0);
    const url = mockExecuteFunctions.getNodeParameter('url', 0);
    
    expect(resource).toBe('content');
    expect(operation).toBe('getHtml');
    expect(url).toBe('https://example.com');
  });
}); 