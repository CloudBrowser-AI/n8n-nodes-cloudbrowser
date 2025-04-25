# Testing CloudBrowser Node

This directory contains tests for the CloudBrowser node package.

## Test Structure

- `nodes/`: Contains tests for individual node functionality
- `credentials/`: Contains tests for credential types
- `mocks/`: Contains mock implementations for testing

## Running Tests

To run the tests, use one of the following npm commands:

```bash
# Run all tests
npm run test

# Run tests in watch mode during development
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Adding Tests

When adding new functionality to the nodes, make sure to add corresponding tests to maintain code quality and prevent regressions. Here are the general guidelines for writing tests:

1. Test the node description structure
2. Test individual operations
3. Mock external dependencies (API calls, database queries)
4. Test error handling

## Test Mocks

The `mocks` directory contains helper classes to simulate the n8n execution environment. Use these to test complex node functionality that requires interaction with the n8n workflow engine.

## Code Coverage

We aim for high code coverage to ensure that our code is well-tested. The test coverage report will be generated when running the `test:coverage` command.

## Guidelines for Writing Tests

1. **Isolate Tests**: Each test should be independent and not rely on the state of other tests.
2. **Mock External Services**: Never make real API calls in tests.
3. **Test Happy Path and Edge Cases**: Test both successful operations and error cases.
4. **Keep Tests Fast**: Tests should execute quickly to ensure they are run frequently.

## Examples

### Testing Node Description

```typescript
it('should have the correct name', () => {
  expect(cloudBrowser.description.name).toBe('cloudBrowser');
});
```

### Testing Node Operations

```typescript
it('should retrieve HTML content when executed with getHtml operation', async () => {
  // Setup mock execution functions
  const mockExecuteFunctions = new MockExecuteFunctions();
  mockExecuteFunctions.setParameters({
    resource: 'content',
    operation: 'getHtml',
    url: 'https://example.com',
  });
  
  // Test node execution
  const result = await cloudBrowser.execute.call(mockExecuteFunctions);
  
  // Assert results
  expect(result).toBeDefined();
  expect(result[0][0].json.content).toBeDefined();
});
``` 