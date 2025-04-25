// Mock de las interfaces básicas de n8n-workflow para pruebas
export interface IDataObject {
  [key: string]: any;
}

export interface INodeExecutionData {
  json: IDataObject;
  binary?: {
    [key: string]: IBinaryData;
  };
  pairedItem?: IPairedItemData;
}

export interface IBinaryData {
  mimeType: string;
  data: string;
  fileName?: string;
  fileExtension?: string;
  fileSize?: number;
}

export interface IPairedItemData {
  item: number;
  input?: number;
}

export interface INode {
  id: string;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
  parameters?: INodeParameters;
}

export type INodeParameters = { [key: string]: any };

export type NodeParameterValue = string | number | boolean | undefined | null;

export class NodeOperationError extends Error {
  constructor(node: INode, message: string, options?: any) {
    super(message);
    this.name = 'NodeOperationError';
  }
}

export interface INodeType {
  description: INodeTypeDescription;
  execute?: (this: any) => Promise<any[][]>;
}

export interface INodeTypeDescription {
  displayName: string;
  name: string;
  icon?: string;
  group: string[];
  version: number;
  description: string;
  defaults: {
    name: string;
    [key: string]: any;
  };
  inputs: string[];
  outputs: string[];
  credentials?: INodeCredentials[];
  properties: INodeProperties[];
}

export interface INodeCredentials {
  name: string;
  required?: boolean;
  displayOptions?: IDisplayOptions;
}

export interface INodeProperties {
  displayName: string;
  name: string;
  type: string;
  default?: any;
  description?: string;
  required?: boolean;
  options?: Array<INodePropertyOptions>;
  displayOptions?: IDisplayOptions;
  typeOptions?: INodePropertyTypeOptions;
  [key: string]: any;
}

export interface INodePropertyOptions {
  name: string;
  value: string | number | boolean;
  description?: string;
  action?: string;
  [key: string]: any;
}

export interface IDisplayOptions {
  show?: {
    [key: string]: any[] | boolean;
  };
  hide?: {
    [key: string]: any[] | boolean;
  };
}

export interface INodePropertyTypeOptions {
  [key: string]: any;
}

export interface ICredentialType {
  name: string;
  displayName: string;
  documentationUrl?: string;
  properties: INodeProperties[];
  authenticate?: IAuthenticate;
  test?: ICredentialTestRequest;
}

export interface IAuthenticate {
  type: string;
  properties: {
    [key: string]: any;
  };
}

export interface ICredentialTestRequest {
  request: {
    baseURL?: string;
    url?: string;
    method: string;
    [key: string]: any;
  };
}

export interface ICredentialDataDecryptedObject {
  [key: string]: any;
} 