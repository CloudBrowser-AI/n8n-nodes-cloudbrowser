![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-cloudbrowser

This is a node for [n8n](https://n8n.io/) that allows users to interact with websites using a cloud-based browser instance powered by Puppeteer. It provides several operations to navigate to websites and retrieve different types of content.

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

### 1. Get HTML from Website

This operation allows you to navigate to a specified URL and retrieve the HTML content of the page.

**Output:**
- Page title
- Final URL (after any redirects)
- Full HTML content

### 2. Get Screenshot from Website

This operation allows you to navigate to a specified URL and capture a screenshot of the page.

**Options:**
- Full page or viewport only
- Image quality (for JPEG)
- Image format (JPEG or PNG)
- Clip area (coordinates and dimensions)

**Output:**
- Screenshot as base64
- Binary data
- File metadata (filename, extension, MIME type)

### 3. Get PDF from Website

This operation allows you to navigate to a specified URL and generate a PDF version of the page.

**Options:**
- Paper format (A4, Letter, etc.)
- Orientation (portrait/landscape)
- Background printing
- Scale
- Margins
- Page ranges

**Output:**
- PDF as base64
- Binary data
- File metadata (filename, extension, MIME type)

## Configuration

All operations require the following common parameters:

- **API Token:** Your CloudBrowser API token for authentication
- **URL to Navigate:** The website URL to visit
- **Navigation Options:**
  - Wait until event (load, domcontentloaded, networkidle)
  - Timeout

Additional browser configuration options include:
- Browser type (Chrome, Chromium)
- Headless mode
- Stealth mode
- Session management
- Proxy settings

## Example Usage

### Capture a Website Screenshot and Save as File

1. Add the CloudBrowser node
2. Select "Get Screenshot from Website" operation
3. Enter your API token
4. Specify the URL (e.g., https://n8n.io)
5. Configure screenshot options as needed
6. Connect to a Write Binary File node to save the image

### Generate a PDF from a Website

1. Add the CloudBrowser node
2. Select "Get PDF from Website" operation
3. Enter your API token
4. Specify the URL (e.g., https://docs.n8n.io)
5. Configure PDF options as needed
6. Connect to a Write Binary File node to save the PDF

## API Requirements

This node requires an API token from CloudBrowser.ai service. Please sign up at https://cloudbrowser.ai to obtain your API token.

## License

[MIT](LICENSE.md)
