![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-cloudbrowser

This is a node for [n8n](https://n8n.io/) that allows users to interact with websites using a cloud-based browser instance powered by Puppeteer. It provides various operations to navigate websites and retrieve different types of content.

## Installation

Follow these steps to install this node:

```bash
# Install via npm
npm install n8n-nodes-cloudbrowser

# Or directly from n8n
n8n community-nodes add n8n-nodes-cloudbrowser
```

## Features

The CloudBrowser node offers the following operations:

### 1. Get Website HTML

This operation allows you to navigate to a specific URL and retrieve the HTML content of the page.

**Output:**
- Page title
- Final URL (after any redirections)
- Full HTML content

### 2. Get Website Screenshot

This operation allows you to navigate to a specific URL and capture an image of the page.

**Options:**
- Full page or viewport only
- Image quality (for JPEG)
- Image format (JPEG or PNG)
- Crop area (coordinates and dimensions)

**Output:**
- Screenshot in base64
- Binary data
- File metadata (name, extension, MIME type)

### 3. Get Website PDF

This operation allows you to navigate to a specific URL and generate a PDF version of the page.

**Options:**
- Paper format (A4, Letter, etc.)
- Orientation (portrait/landscape)
- Print backgrounds
- Scale
- Margins
- Page ranges

**Output:**
- PDF in base64
- Binary data
- File metadata (name, extension, MIME type)

## Configuration

All operations require the following common parameters:

- **CloudBrowser API Credentials:** Your CloudBrowser API credentials for authentication
- **URL to Navigate:** The URL of the website to visit
- **Navigation Options:**
  - Wait until event (load, domcontentloaded, networkidle)
  - Timeout

Additional browser configuration options include:
- Browser type (Chrome, Chromium)
- Headless mode
- Stealth mode
- Session management
- Proxy configuration

## Usage Example

### Capture a screenshot of a website and save it as a file

1. Add the CloudBrowser node
2. Configure the CloudBrowser API credentials
3. Select the "Get Website Screenshot" operation
4. Specify the URL (e.g., https://n8n.io)
5. Configure the screenshot options as needed
6. Connect to a Write Binary File node to save the image

### Generate a PDF of a website

1. Add the CloudBrowser node
2. Configure the CloudBrowser API credentials
3. Select the "Get Website PDF" operation
4. Specify the URL (e.g., https://docs.n8n.io)
5. Configure the PDF options as needed
6. Connect to a Write Binary File node to save the PDF

## API Requirements

This node requires an API token from the CloudBrowser.ai service. Please register at https://cloudbrowser.ai to obtain your API token and configure it in the credentials section.

## License

[MIT](LICENSE.md)
