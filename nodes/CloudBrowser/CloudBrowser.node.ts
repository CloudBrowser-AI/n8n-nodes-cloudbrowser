import {
 IExecuteFunctions,
} from 'n8n-workflow';
import {
 IDataObject,
 INodeExecutionData,
 INodeType,
 INodeTypeDescription,
 IHttpRequestMethods,
} from 'n8n-workflow';
import * as puppeteer from 'puppeteer';

export class CloudBrowser implements INodeType {
 description: INodeTypeDescription = {
   displayName: 'CloudBrowser',
   name: 'cloudBrowser',
   icon: 'file:cloudbrowserlogo.png',
   group: ['transform'],
   version: 1,
   description: 'Interact with websites using a cloud-based browser instance',
   defaults: {
     name: 'CloudBrowser',
     color: '#772244',
   },
   inputs: ['main'],
   outputs: ['main'],
   properties: [
     {
       displayName: 'Resource',
       name: 'resource',
       type: 'options',
       noDataExpression: true,
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
       noDataExpression: true,
       displayOptions: {
         show: {
           resource: [
             'content',
           ],
         },
       },
       options: [
         {
           name: 'Get HTML from Website',
           value: 'getHtml',
           description: 'Navigate to URL and retrieve HTML content',
           action: 'Get HTML from website',
         },
         {
           name: 'Get Screenshot from Website',
           value: 'getScreenshot',
           description: 'Navigate to URL and take a screenshot',
           action: 'Get screenshot from website',
         },
         {
           name: 'Get PDF from Website',
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
       noDataExpression: true,
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
     },
     {
       displayName: 'API Token',
       name: 'apiToken',
       type: 'string',
       default: '',
       description: 'API token for authentication',
       required: true,
       displayOptions: {
         show: {
           resource: [
             'content',
             'navigation',
           ],
           operation: [
             'getHtml', 
             'getScreenshot', 
             'getPdf',
             'open'
           ],
         },
       },
     },
     {
       displayName: 'WebSocket Address',
       name: 'webSocketAddress',
       type: 'string',
       default: '',
       description: 'Browser WebSocket address returned from Open Browser operation',
       required: true,
       displayOptions: {
         show: {
           resource: [
             'navigation',
           ],
           operation: [
             'goto',
             'clickOnPage',
             'close'
           ],
         },
       },
     },
     {
       displayName: 'CSS Selector',
       name: 'cssSelector',
       type: 'string',
       default: '',
       description: 'CSS selector for the element to click on',
       required: true,
       displayOptions: {
         show: {
           resource: [
             'navigation',
           ],
           operation: [
             'clickOnPage',
           ],
         },
       },
     },
     {
       displayName: 'URL to Navigate',
       name: 'url',
       type: 'string',
       default: '',
       description: 'The URL to navigate to after opening the browser',
       required: true,
       displayOptions: {
         show: {
           resource: [
             'content',
             'navigation',
           ],
           operation: [
             'getHtml', 
             'getScreenshot', 
             'getPdf',
             'goto'
           ],
         },
       },
     },
     {
       displayName: 'Navigation Options',
       name: 'navigationOptions',
       type: 'collection',
       placeholder: 'Add Navigation Options',
       default: {},
       displayOptions: {
         show: {
           resource: [
             'content',
             'navigation',
           ],
           operation: [
             'getHtml',
             'getScreenshot',
             'getPdf',
             'goto'
           ],
         },
       },
       options: [
         {
           displayName: 'Wait Until',
           name: 'waitUntil',
           type: 'options',
           options: [
             { name: 'load', value: 'load' },
             { name: 'domcontentloaded', value: 'domcontentloaded' },
             { name: 'networkidle0', value: 'networkidle0' },
             { name: 'networkidle2', value: 'networkidle2' },
           ],
           default: 'load',
         },
         {
           displayName: 'Timeout (ms)',
           name: 'timeout',
           type: 'number',
           default: 30000,
           description: 'Maximum navigation time in milliseconds',
         },
       ],
     },
     {
       displayName: 'Browser Configuration',
       name: 'browserConfig',
       type: 'collection',
       placeholder: 'Add Browser Configuration',
       default: {},
       displayOptions: {
         show: {
           resource: [
             'content',
             'navigation',
           ],
           operation: [
             'getHtml',
             'getScreenshot',
             'getPdf',
             'open'
           ],
         },
       },
       options: [
         {
           displayName: 'Browser Type',
           name: 'browser',
           type: 'options',
           options: [
             { name: 'Chrome', value: 0 },
             { name: 'Chromium', value: 2 },
             { name: 'ChromeHeadlessShell', value: 3 },
           ],
           default: 0,
         },
         {
           displayName: 'Headless Mode',
           name: 'headless',
           type: 'boolean',
           default: false,
         },
         {
           displayName: 'Stealth Mode',
           name: 'stealth',
           type: 'boolean',
           default: true,
         },
         {
           displayName: 'Keep Open (seconds)',
           name: 'keepOpen',
           type: 'number',
           default: 300,
           description: 'Seconds before auto-closing (0 for never)',
         },
         {
           displayName: 'Label',
           name: 'label',
           type: 'string',
           description: 'Instance name for recognition',
           default: '',
         },
         {
           displayName: 'Save Session',
           name: 'saveSession',
           type: 'boolean',
           default: false,
         },
         {
           displayName: 'Recover Session',
           name: 'recoverSession',
           type: 'boolean',
           default: false,
         },
       ],
     },
     {
       displayName: 'Custom Arguments',
       name: 'args',
       type: 'fixedCollection',
       typeOptions: {
         multipleValues: true,
       },
       default: {},
       displayOptions: {
         show: {
           resource: [
             'content',
             'navigation',
           ],
           operation: [
             'getHtml',
             'getScreenshot',
             'getPdf',
             'open'
           ],
         },
       },
       options: [
         {
           name: 'argsValues',
           displayName: 'Arguments',
           values: [
             {
               displayName: 'Argument',
               name: 'argument',
               type: 'string',
               default: '',
             },
           ],
         },
       ],
     },
     {
       displayName: 'Ignored Default Arguments',
       name: 'ignoredDefaultArgs',
       type: 'fixedCollection',
       typeOptions: {
         multipleValues: true,
       },
       default: {},
       displayOptions: {
         show: {
           resource: [
             'content',
             'navigation',
           ],
           operation: [
             'getHtml',
             'getScreenshot',
             'getPdf',
             'open'
           ],
         },
       },
       options: [
         {
           name: 'ignoredArgsValues',
           displayName: 'Ignored Arguments',
           values: [
             {
               displayName: 'Argument',
               name: 'argument',
               type: 'string',
               default: '',
             },
           ],
         },
       ],
     },
     {
       displayName: 'Proxy Configuration',
       name: 'proxy',
       type: 'collection',
       placeholder: 'Add Proxy Configuration',
       default: {},
       displayOptions: {
         show: {
           resource: [
             'content',
             'navigation',
           ],
           operation: [
             'getHtml',
             'getScreenshot',
             'getPdf',
             'open'
           ],
         },
       },
       options: [
         {
           displayName: 'Host',
           name: 'host',
           type: 'string',
           default: '',
         },
         {
           displayName: 'Port',
           name: 'port',
           type: 'string',
           default: '',
         },
         {
           displayName: 'Username',
           name: 'username',
           type: 'string',
           default: '',
         },
         {
           displayName: 'Password',
           name: 'password',
           type: 'string',
           typeOptions: {
             password: true,
           },
           default: '',
         },
       ],
     },
     // Screenshot specific options - only shown when getScreenshot operation is selected
     {
       displayName: 'Screenshot Options',
       name: 'screenshotOptions',
       type: 'collection',
       placeholder: 'Add Screenshot Options',
       default: {},
       displayOptions: {
         show: {
           resource: [
             'content',
           ],
           operation: [
             'getScreenshot',
           ],
         },
       },
       options: [
         {
           displayName: 'Full Page',
           name: 'fullPage',
           type: 'boolean',
           default: true,
           description: 'When true, takes a screenshot of the full scrollable page',
         },
         {
           displayName: 'Quality',
           name: 'quality',
           type: 'number',
           default: 80,
           description: 'Quality of the image (0-100) for JPEG format',
           typeOptions: {
             minValue: 0,
             maxValue: 100,
           },
         },
         {
           displayName: 'Type',
           name: 'type',
           type: 'options',
           options: [
             { name: 'JPEG', value: 'jpeg' },
             { name: 'PNG', value: 'png' },
           ],
           default: 'png',
           description: 'Image format of the screenshot',
         },
         {
           displayName: 'Clip',
           name: 'clip',
           type: 'collection',
           placeholder: 'Add Clip Configuration',
           default: {},
           options: [
             {
               displayName: 'X',
               name: 'x',
               type: 'number',
               default: 0,
               description: 'X-coordinate of top-left corner of clip area',
             },
             {
               displayName: 'Y',
               name: 'y',
               type: 'number',
               default: 0,
               description: 'Y-coordinate of top-left corner of clip area',
             },
             {
               displayName: 'Width',
               name: 'width',
               type: 'number',
               default: 1000,
               description: 'Width of clip area',
             },
             {
               displayName: 'Height',
               name: 'height',
               type: 'number',
               default: 1000,
               description: 'Height of clip area',
             },
           ],
         },
       ],
     },
     // PDF specific options - only shown when getPdf operation is selected
     {
       displayName: 'PDF Options',
       name: 'pdfOptions',
       type: 'collection',
       placeholder: 'Add PDF Options',
       default: {},
       displayOptions: {
         show: {
           resource: [
             'content',
           ],
           operation: [
             'getPdf',
           ],
         },
       },
       options: [
         {
           displayName: 'Format',
           name: 'format',
           type: 'options',
           options: [
             { name: 'Letter', value: 'Letter' },
             { name: 'Legal', value: 'Legal' },
             { name: 'Tabloid', value: 'Tabloid' },
             { name: 'A0', value: 'A0' },
             { name: 'A1', value: 'A1' },
             { name: 'A2', value: 'A2' },
             { name: 'A3', value: 'A3' },
             { name: 'A4', value: 'A4' },
             { name: 'A5', value: 'A5' },
             { name: 'A6', value: 'A6' },
           ],
           default: 'A4',
           description: 'Paper format of the PDF',
         },
         {
           displayName: 'Landscape',
           name: 'landscape',
           type: 'boolean',
           default: false,
           description: 'Whether to generate PDF in landscape mode',
         },
         {
           displayName: 'Print Background',
           name: 'printBackground',
           type: 'boolean',
           default: true,
           description: 'Whether to print background graphics',
         },
         {
           displayName: 'Scale',
           name: 'scale',
           type: 'number',
           default: 1,
           description: 'Scale of the webpage rendering (1 = 100%)',
           typeOptions: {
             minValue: 0.1,
             maxValue: 2,
           },
         },
         {
           displayName: 'Margin',
           name: 'margin',
           type: 'collection',
           placeholder: 'Add Margin Configuration',
           default: {},
           options: [
             {
               displayName: 'Top (mm)',
               name: 'top',
               type: 'number',
               default: 0,
               description: 'Top margin in millimeters',
             },
             {
               displayName: 'Right (mm)',
               name: 'right',
               type: 'number',
               default: 0,
               description: 'Right margin in millimeters',
             },
             {
               displayName: 'Bottom (mm)',
               name: 'bottom',
               type: 'number',
               default: 0,
               description: 'Bottom margin in millimeters',
             },
             {
               displayName: 'Left (mm)',
               name: 'left',
               type: 'number',
               default: 0,
               description: 'Left margin in millimeters',
             },
           ],
         },
         {
           displayName: 'Page Ranges',
           name: 'pageRanges',
           type: 'string',
           default: '',
           description: 'Paper ranges to print, e.g. \'1-5, 8, 11-13\' (empty string means all pages)',
         },
       ],
     },
   ],
 };

 async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
   const items = this.getInputData();
   const returnData: IDataObject[] = [];

   for (let i = 0; i < items.length; i++) {
     const resource = this.getNodeParameter('resource', i) as string;
     const operation = this.getNodeParameter('operation', i) as string;
     
     try {
       let result: IDataObject = {};
       
       // Handle different operation types
       if (resource === 'navigation' && operation === 'open') {
         // Open operation - just open a browser and return the WebSocket address
         const apiToken = this.getNodeParameter('apiToken', i) as string;
         const browserConfig = this.getNodeParameter('browserConfig', i, {}) as IDataObject;
         const argsCollection = this.getNodeParameter('args.argsValues', i, []) as IDataObject[];
         const ignoredArgsCollection = this.getNodeParameter('ignoredDefaultArgs.ignoredArgsValues', i, []) as IDataObject[];
         const proxyConfig = this.getNodeParameter('proxy', i, {}) as IDataObject;

         const args = argsCollection.map(item => item.argument as string);
         const ignoredDefaultArgs = ignoredArgsCollection.map(item => item.argument as string);

         const openOptions = {
           method: 'POST' as IHttpRequestMethods,
           url: 'https://production.cloudbrowser.ai/api/v1/Browser/Open',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${apiToken}`,
           },
           body: {
             Args: args.length ? args : null,
             IgnoredDefaultArgs: ignoredDefaultArgs.length ? ignoredDefaultArgs : null,
             Headless: browserConfig.headless,
             Stealth: browserConfig.stealth,
             Browser: browserConfig.browser,
             KeepOpen: browserConfig.keepOpen,
             Label: browserConfig.label,
             SaveSession: browserConfig.saveSession,
             RecoverSession: browserConfig.recoverSession,
             Proxy: Object.keys(proxyConfig).length ? proxyConfig : null,
           },
           json: true,
         };

         const openResponse = await this.helpers.request!(openOptions);
         
         if (!openResponse.address) {
           throw new Error('No WebSocket address received from the browser service');
         }
         
         result = {
           webSocketAddress: openResponse.address,
           sessionId: openResponse.sessionId,
           status: 'Browser opened successfully',
         };
       } 
       else if (resource === 'navigation' && operation === 'goto') {
         // Navigate to a URL using an existing WebSocket connection
         const webSocketAddress = this.getNodeParameter('webSocketAddress', i) as string;
         const url = this.getNodeParameter('url', i) as string;
         const navigationOptions = this.getNodeParameter('navigationOptions', i, {}) as IDataObject;
         
         // Connect to the browser using the provided WebSocket address
         const browser = await puppeteer.connect({
           browserWSEndpoint: webSocketAddress,
           defaultViewport: null,
         });
         
         // Create a new page and navigate to the URL
         const page = await browser.newPage();
         await page.goto(url, {
           waitUntil: (navigationOptions.waitUntil as 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2') || 'load',
           timeout: (navigationOptions.timeout as number) || 30000,
         });
         
         // Get the page information
         result = {
           title: await page.title(),
           url: page.url(),
           content: await page.content(),
           status: 'Navigation successful',
         };
         
         // Disconnect from the browser but leave it open
         await browser.disconnect();
       }
       else if (resource === 'navigation' && operation === 'clickOnPage') {
         // Click on an element using an existing WebSocket connection
         const webSocketAddress = this.getNodeParameter('webSocketAddress', i) as string;
         const cssSelector = this.getNodeParameter('cssSelector', i) as string;
         
         // Connect to the browser using the provided WebSocket address
         const browser = await puppeteer.connect({
           browserWSEndpoint: webSocketAddress,
           defaultViewport: null,
         });
         
         // Get the first page
         const pages = await browser.pages();
         const page = pages[0]; // Get the first tab
         
         if (!page) {
           throw new Error('No page found in the browser');
         }
         
         // Wait for the selector to be available and click on it
         await page.waitForSelector(cssSelector);
         await page.click(cssSelector);
         
         // Get the updated page information
         result = {
           title: await page.title(),
           url: page.url(),
           content: await page.content(),
           status: 'Click operation successful',
           clickedSelector: cssSelector,
         };
         
         // Disconnect from the browser but leave it open
         await browser.disconnect();
       }
       else if (resource === 'navigation' && operation === 'close') {
         // Close a browser using its WebSocket address
         const webSocketAddress = this.getNodeParameter('webSocketAddress', i) as string;
         
         // Connect to the browser using the provided WebSocket address
         const browser = await puppeteer.connect({
           browserWSEndpoint: webSocketAddress,
           defaultViewport: null,
         });
         
         // Close the browser
         await browser.close();
         
         result = {
           status: 'Browser closed successfully',
         };
       }
       else if (resource === 'content') {
         // Handle content operations (getHtml, getScreenshot, getPdf)
         const apiToken = this.getNodeParameter('apiToken', i) as string;
         const url = this.getNodeParameter('url', i) as string;
         const navigationOptions = this.getNodeParameter('navigationOptions', i, {}) as IDataObject;
         const browserConfig = this.getNodeParameter('browserConfig', i, {}) as IDataObject;
         const argsCollection = this.getNodeParameter('args.argsValues', i, []) as IDataObject[];
         const ignoredArgsCollection = this.getNodeParameter('ignoredDefaultArgs.ignoredArgsValues', i, []) as IDataObject[];
         const proxyConfig = this.getNodeParameter('proxy', i, {}) as IDataObject;

         const args = argsCollection.map(item => item.argument as string);
         const ignoredDefaultArgs = ignoredArgsCollection.map(item => item.argument as string);

         // First, open the browser
         const openOptions = {
           method: 'POST' as IHttpRequestMethods,
           url: 'https://production.cloudbrowser.ai/api/v1/Browser/Open',
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${apiToken}`,
           },
           body: {
             Args: args.length ? args : null,
             IgnoredDefaultArgs: ignoredDefaultArgs.length ? ignoredDefaultArgs : null,
             Headless: browserConfig.headless,
             Stealth: browserConfig.stealth,
             Browser: browserConfig.browser,
             KeepOpen: browserConfig.keepOpen,
             Label: browserConfig.label,
             SaveSession: browserConfig.saveSession,
             RecoverSession: browserConfig.recoverSession,
             Proxy: Object.keys(proxyConfig).length ? proxyConfig : null,
           },
           json: true,
         };

         // Open the browser and get the WebSocket address
         const openResponse = await this.helpers.request!(openOptions);
         
         if (!openResponse.address) {
           throw new Error('No WebSocket address received from the browser service');
         }

         // Connect to the browser using Puppeteer
         const browser = await puppeteer.connect({
           browserWSEndpoint: openResponse.address,
           defaultViewport: null,
         });

         // Create a new page and navigate to the URL
         const page = await browser.newPage();
         await page.goto(url, {
           waitUntil: navigationOptions.waitUntil as 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2',
           timeout: navigationOptions.timeout as number,
         });

         if (operation === 'getHtml') {
           // Get page information for HTML action
           result = {
             title: await page.title(),
             url: page.url(),
             content: await page.content(),
           };
         } else if (operation === 'getScreenshot') {
           // Get screenshot
           const screenshotOptions = this.getNodeParameter('screenshotOptions', i, {}) as IDataObject;
           
           const options: puppeteer.ScreenshotOptions = {
             fullPage: screenshotOptions.fullPage as boolean,
             type: (screenshotOptions.type as puppeteer.ScreenshotOptions['type']) || 'png',
           };
           
           if (screenshotOptions.type === 'jpeg' && screenshotOptions.quality) {
             options.quality = screenshotOptions.quality as number;
           }
           
           if (screenshotOptions.clip && !screenshotOptions.fullPage) {
             const clip = screenshotOptions.clip as IDataObject;
             if (clip.x !== undefined && clip.y !== undefined && clip.width !== undefined && clip.height !== undefined) {
               options.clip = {
                 x: clip.x as number,
                 y: clip.y as number,
                 width: clip.width as number,
                 height: clip.height as number,
               };
             }
           }
           
           // Take the screenshot
           const screenshot = await page.screenshot(options);
           
           // Convert the binary data to base64 for output
           const base64Screenshot = Buffer.from(screenshot as Buffer).toString('base64');
           
           // Create the image data with proper metadata
           const imageType = options.type === 'jpeg' ? 'image/jpeg' : 'image/png';
           const extension = options.type === 'jpeg' ? 'jpg' : 'png';
           
           result = {
             url: page.url(),
             title: await page.title(),
             screenshot: `data:${imageType};base64,${base64Screenshot}`,
             screenshotBinary: screenshot,
             filename: `screenshot_${new Date().getTime()}.${extension}`,
             fileExtension: extension,
             mimeType: imageType,
           };
         } else if (operation === 'getPdf') {
           // Get PDF from website
           const pdfOptions = this.getNodeParameter('pdfOptions', i, {}) as IDataObject;
           
           const options: puppeteer.PDFOptions = {
             format: (pdfOptions.format as puppeteer.PaperFormat) || 'A4',
             landscape: pdfOptions.landscape as boolean,
             printBackground: pdfOptions.printBackground !== false,
             scale: pdfOptions.scale as number || 1,
             pageRanges: pdfOptions.pageRanges as string || '',
           };
           
           // Add margins if specified
           if (pdfOptions.margin) {
             const margin = pdfOptions.margin as IDataObject;
             options.margin = {
               top: margin.top !== undefined ? `${margin.top}mm` : '0mm',
               right: margin.right !== undefined ? `${margin.right}mm` : '0mm',
               bottom: margin.bottom !== undefined ? `${margin.bottom}mm` : '0mm',
               left: margin.left !== undefined ? `${margin.left}mm` : '0mm',
             };
           }
           
           // Generate the PDF
           const pdf = await page.pdf(options);
           
           // Convert the binary data to base64 for output
           const base64Pdf = Buffer.from(pdf).toString('base64');
           
           result = {
             url: page.url(),
             title: await page.title(),
             pdf: `data:application/pdf;base64,${base64Pdf}`,
             pdfBinary: pdf,
             filename: `webpage_${new Date().getTime()}.pdf`,
             fileExtension: 'pdf',
             mimeType: 'application/pdf',
           };
         }

         // Close the browser connection
         await browser.disconnect();
       }
       else {
         throw new Error(`The operation "${operation}" for resource "${resource}" is not supported`);
       }

       // Return results
       returnData.push(result);

     } catch (error) {
       if (this.continueOnFail()) {
         returnData.push({ error: (error as Error).message });
       } else {
         throw error;
       }
     }
   }

   return [this.helpers.returnJsonArray(returnData)];
 }
}

// This is crucial for n8n to correctly import the class
module.exports = { CloudBrowser }; 