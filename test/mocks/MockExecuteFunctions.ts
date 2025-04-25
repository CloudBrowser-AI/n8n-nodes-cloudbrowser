import {
  IDataObject,
  INode,
  INodeExecutionData,
  INodeParameters,
  NodeParameterValue,
  ICredentialDataDecryptedObject,
} from '../mocks/n8n-workflow.mock';
import { vi } from 'vitest';

// Versión simplificada del mock para pruebas básicas
export class MockExecuteFunctions {
  private nodeParameters: INodeParameters = {};
  private inputData: INodeExecutionData[][] = [[]];
  private credentials: Record<string, ICredentialDataDecryptedObject> = {};
  private returnData: INodeExecutionData[] = [];
  private node: INode = {
    id: 'mock-node-id',
    name: 'Mock Node',
    type: 'n8n-nodes-cloudbrowser.cloudBrowser',
    typeVersion: 1,
    position: [0, 0],
    parameters: {},
  };

  // Métodos para configurar el mock
  setNode(node: INode): void {
    this.node = node;
  }

  setParameters(parameters: INodeParameters): void {
    this.nodeParameters = parameters;
  }

  setInputData(inputData: INodeExecutionData[][]): void {
    this.inputData = inputData;
  }

  setCredentials(type: string, credentials: ICredentialDataDecryptedObject): void {
    this.credentials[type] = credentials;
  }

  // Implementación básica de las funciones principales de IExecuteFunctions
  getInputData(): INodeExecutionData[][] {
    return this.inputData;
  }

  getNode(): INode {
    return this.node;
  }

  getNodeParameter(
    parameterName: string,
    itemIndex: number,
    fallbackValue?: any,
  ): NodeParameterValue {
    return this.nodeParameters[parameterName] ?? fallbackValue;
  }

  getCredentials(type: string): Promise<ICredentialDataDecryptedObject> {
    if (this.credentials[type]) {
      return Promise.resolve(this.credentials[type]);
    }
    throw new Error(`No credentials for type ${type} found`);
  }

  prepareOutputData(data: INodeExecutionData[]): INodeExecutionData[][] {
    this.returnData = data;
    return [data];
  }

  // Mock de helpers
  helpers = {
    httpRequest: vi.fn(),
    request: vi.fn(),
    requestWithAuthentication: vi.fn(),
  };
} 