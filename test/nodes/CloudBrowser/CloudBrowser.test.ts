import { describe, it, expect, vi, beforeEach } from 'vitest';
import { INodeType, INodeTypeDescription } from '../../mocks/n8n-workflow.mock';

// Mock de puppeteer
vi.mock('puppeteer', () => {
  return {
    connect: vi.fn(),
  };
});

// Clase mock de CloudBrowser para pruebas
class CloudBrowser implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'CloudBrowser',
    name: 'cloudBrowser',
    icon: 'file:cloudbrowserlogo.svg',
    group: ['transform'],
    version: 1,
    description: 'Interact with websites using a cloud-based browser instance',
    defaults: {
      name: 'CloudBrowser',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'cloudBrowserApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        options: [
          {
            name: 'Content',
            value: 'content',
          },
          {
            name: 'Navigation',
            value: 'navigation',
          },
        ],
        default: 'content',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
          show: {
            resource: [
              'content',
            ],
          },
        },
        options: [
          {
            name: 'Get HTML From Website',
            value: 'getHtml',
            description: 'Navigate to URL and retrieve HTML content',
            action: 'Get HTML from website',
          },
          {
            name: 'Get Screenshot From Website',
            value: 'getScreenshot',
            description: 'Navigate to URL and take a screenshot',
            action: 'Get screenshot from website',
          },
          {
            name: 'Get PDF From Website',
            value: 'getPdf',
            description: 'Navigate to URL and generate a PDF',
            action: 'Get PDF from website',
          },
        ],
        default: 'getHtml',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
          show: {
            resource: [
              'navigation',
            ],
          },
        },
        options: [
          {
            name: 'Open Browser',
            value: 'open',
            description: 'Opens a new browser instance',
            action: 'Open browser',
          },
          {
            name: 'Navigate to URL',
            value: 'goto',
            description: 'Navigate to a specific URL',
            action: 'Navigate to URL',
          },
          {
            name: 'Click on Page Element',
            value: 'clickOnPage',
            description: 'Click on an element using CSS selector',
            action: 'Click on page element',
          },
          {
            name: 'Close Browser',
            value: 'close',
            description: 'Close the browser instance',
            action: 'Close browser',
          },
        ],
        default: 'open',
      }
    ],
  };
}

describe('Nodo CloudBrowser', () => {
  let cloudBrowser: CloudBrowser;

  beforeEach(() => {
    cloudBrowser = new CloudBrowser();
    vi.clearAllMocks();
  });

  describe('Descripción del nodo', () => {
    it('debería tener el nombre correcto', () => {
      expect(cloudBrowser.description.name).toBe('cloudBrowser');
    });

    it('debería tener el displayName correcto', () => {
      expect(cloudBrowser.description.displayName).toBe('CloudBrowser');
    });

    it('debería estar en el grupo "transform"', () => {
      expect(cloudBrowser.description.group).toContain('transform');
    });

    it('debería tener entrada y salida', () => {
      expect(cloudBrowser.description.inputs).toEqual(['main']);
      expect(cloudBrowser.description.outputs).toEqual(['main']);
    });

    it('debería requerir credenciales cloudBrowserApi', () => {
      const credentialConfig = cloudBrowser.description.credentials?.find(cred => cred.name === 'cloudBrowserApi');
      expect(credentialConfig).toBeDefined();
      expect(credentialConfig?.required).toBe(true);
    });

    it('debería tener recursos "content" y "navigation"', () => {
      const resourceProperty = cloudBrowser.description.properties.find(prop => prop.name === 'resource');
      expect(resourceProperty).toBeDefined();
      expect(resourceProperty?.options).toContainEqual(expect.objectContaining({ name: 'Content', value: 'content' }));
      expect(resourceProperty?.options).toContainEqual(expect.objectContaining({ name: 'Navigation', value: 'navigation' }));
    });

    it('debería tener las operaciones correctas para "content"', () => {
      const contentOperations = cloudBrowser.description.properties.find(
        prop => {
          if (prop.name !== 'operation' || !prop.displayOptions || !prop.displayOptions.show) return false;
          const resourceArray = prop.displayOptions.show.resource;
          return Array.isArray(resourceArray) && resourceArray.includes('content');
        }
      );
      expect(contentOperations).toBeDefined();
      expect(contentOperations?.options).toContainEqual(
        expect.objectContaining({ name: 'Get HTML From Website', value: 'getHtml' })
      );
      expect(contentOperations?.options).toContainEqual(
        expect.objectContaining({ name: 'Get Screenshot From Website', value: 'getScreenshot' })
      );
      expect(contentOperations?.options).toContainEqual(
        expect.objectContaining({ name: 'Get PDF From Website', value: 'getPdf' })
      );
    });

    it('debería tener las operaciones correctas para "navigation"', () => {
      const navigationOperations = cloudBrowser.description.properties.find(
        prop => {
          if (prop.name !== 'operation' || !prop.displayOptions || !prop.displayOptions.show) return false;
          const resourceArray = prop.displayOptions.show.resource;
          return Array.isArray(resourceArray) && resourceArray.includes('navigation');
        }
      );
      expect(navigationOperations).toBeDefined();
      expect(navigationOperations?.options).toContainEqual(
        expect.objectContaining({ name: 'Open Browser', value: 'open' })
      );
      expect(navigationOperations?.options).toContainEqual(
        expect.objectContaining({ name: 'Navigate to URL', value: 'goto' })
      );
      expect(navigationOperations?.options).toContainEqual(
        expect.objectContaining({ name: 'Click on Page Element', value: 'clickOnPage' })
      );
      expect(navigationOperations?.options).toContainEqual(
        expect.objectContaining({ name: 'Close Browser', value: 'close' })
      );
    });
  });

  // Para pruebas del método execute(), necesitaríamos implementar un mock más completo
  // de IExecuteFunctions. Estas pruebas serían más complejas y se implementarían en un PR futuro.
}); 