import {
	ICredentialType,
	INodeProperties,
	IAuthenticateGeneric,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class CloudBrowserApi implements ICredentialType {
	name = 'cloudBrowserApi';
	displayName = 'CloudBrowser API';
	documentationUrl = 'https://cloudbrowser.ai/docs';
	properties: INodeProperties[] = [
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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://production.cloudbrowser.ai/api/v1',
			url: '/Browser/Status',
			method: 'GET',
		},
	};
} 