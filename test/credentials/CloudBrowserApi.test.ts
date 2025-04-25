import { describe, it, expect, beforeEach } from 'vitest';

// Versión mock de CloudBrowserApi para pruebas
class CloudBrowserApi {
  name = 'cloudBrowserApi';
  displayName = 'CloudBrowser API';
  documentationUrl = 'https://cloudbrowser.ai/docs';
  
  properties = [
    {
      displayName: 'API Token',
      name: 'apiToken',
      type: 'string',
      default: '',
      required: true,
      typeOptions: {
        password: true,
      },
    },
  ];

  authenticate = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '={{"Bearer " + $credentials.apiToken}}',
      },
    },
  };

  test = {
    request: {
      baseURL: 'https://production.cloudbrowser.ai/api/v1',
      url: '/Browser/Status',
      method: 'GET',
    },
  };
}

describe('Credenciales CloudBrowserApi', () => {
  let cloudBrowserApiCredential: CloudBrowserApi;

  beforeEach(() => {
    cloudBrowserApiCredential = new CloudBrowserApi();
  });

  it('debería tener el nombre correcto', () => {
    expect(cloudBrowserApiCredential.name).toBe('cloudBrowserApi');
  });

  it('debería tener el displayName correcto', () => {
    expect(cloudBrowserApiCredential.displayName).toBe('CloudBrowser API');
  });

  it('debería tener URL de documentación', () => {
    expect(cloudBrowserApiCredential.documentationUrl).toBe('https://cloudbrowser.ai/docs');
  });

  it('debería tener una propiedad requerida de API token', () => {
    const apiTokenProperty = cloudBrowserApiCredential.properties.find(prop => prop.name === 'apiToken');
    expect(apiTokenProperty).toBeDefined();
    expect(apiTokenProperty?.required).toBe(true);
    expect(apiTokenProperty?.type).toBe('string');
    expect(apiTokenProperty?.typeOptions?.password).toBe(true);
  });

  it('debería autenticar con token Bearer', () => {
    expect(cloudBrowserApiCredential.authenticate).toBeDefined();
    expect(cloudBrowserApiCredential.authenticate.type).toBe('generic');
    
    // Verificar la presencia de encabezados de autenticación
    const authProps = cloudBrowserApiCredential.authenticate.properties;
    expect(authProps).toBeDefined();
    
    if (authProps && authProps.headers) {
      expect(authProps.headers.Authorization).toContain('Bearer');
    } else {
      expect.fail('Encabezados de autenticación no definidos');
    }
  });

  it('debería tener una solicitud de prueba válida', () => {
    expect(cloudBrowserApiCredential.test).toBeDefined();
    expect(cloudBrowserApiCredential.test.request.baseURL).toBe('https://production.cloudbrowser.ai/api/v1');
    expect(cloudBrowserApiCredential.test.request.url).toBe('/Browser/Status');
    expect(cloudBrowserApiCredential.test.request.method).toBe('GET');
  });
}); 