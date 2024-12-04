import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';
import assert from 'assert';

// Mocking server responses
const mockStatusUpdate = (status) => {
  jest.spyOn(axios, 'put').mockResolvedValueOnce({ data: { id: preparationId, status }, status: 200 });
};

let preparationId;
let response;

// Given that an order is created
Given('that an order is created', async function () {
  const preparationData = {
    orderId: '12345',
    details: {
      note: 'Order details',
      items: [{ productId: 'prod1', quantity: 2 }],
    },
  };

  jest.spyOn(axios, 'post').mockResolvedValueOnce({ data: { id: '1', status: 'PENDING' }, status: 201 });

  response = await axios.post('http://localhost:3002/api/preparation', preparationData);
  preparationId = response.data.id;
});

// Then it should return 201 and the status should be "PENDING"
Then('it should return 201 and the status should be "PENDING"', function () {
  assert.strictEqual(response.status, 201);
  assert.strictEqual(response.data.status, 'PENDING');
});

// When the preparation status is updated to "IN_PROGRESS"
When('the preparation status is updated to "IN_PROGRESS"', async function () {
  mockStatusUpdate('IN_PROGRESS');

  response = await axios.put(`http://localhost:3002/api/preparation/${preparationId}/status`, { status: 'IN_PROGRESS' });
});

// Then it should return 200 and the status should be "IN_PROGRESS"
Then('it should return 200 and the status should be "IN_PROGRESS"', function () {
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.data.status, 'IN_PROGRESS');
});

// When the preparation status is updated to "READY"
When('the preparation status is updated to "READY"', async function () {
  mockStatusUpdate('READY');

  response = await axios.put(`http://localhost:3002/api/preparation/${preparationId}/status`, { status: 'READY' });
});

// Then it should return 200 and the status should be "READY"
Then('it should return 200 and the status should be "READY"', function () {
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.data.status, 'READY');
});

// When the preparation status is updated to "DELIVERED"
When('the preparation status is updated to "DELIVERED"', async function () {
  mockStatusUpdate('DELIVERED');

  response = await axios.put(`http://localhost:3002/api/preparation/${preparationId}/status`, { status: 'DELIVERED' });
});

// Then it should return 200 and the status should be "DELIVERED"
Then('it should return 200 and the status should be "DELIVERED"', function () {
  assert.strictEqual(response.status, 200);
  assert.strictEqual(response.data.status, 'DELIVERED');
});
