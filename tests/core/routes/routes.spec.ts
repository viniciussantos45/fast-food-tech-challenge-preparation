import { startWebServerApp } from '@/config/app'; 
import { beforeAll, afterAll, it, expect, describe } from 'vitest';
import { server } from '@/config/app'

let preparationId: string;

beforeAll(async () => {
  console.log('Starting server...');
  await startWebServerApp();
  await server.ready();
  console.log('Server started:');
});

afterAll(async () => {
  await server.close();
});

describe('Order Preparation', () => {
  it('Given that an order is created, it should return 201 and the status should be "PENDING"', async () => {
    const preparationData = {
      orderId: '12345', 
      details: {
        note: 'Order details',
        items: [{ productId: 'prod1', quantity: 2 }],
      },
    };

    const response = await server.inject({
      method: 'POST',
      url: '/preparation',
      payload: preparationData,
    });

    expect(response.statusCode).toBe(201);
    const responseBody = JSON.parse(response.body);
    preparationId = responseBody.id;
    expect(responseBody.status).toBe('PENDING');
  });

  it('When the list of preparations is accessed, it should return 200', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/preparations',  
    });

    expect(response.statusCode).toBe(200);
  });

  it('When a specific preparation is accessed by ID, it should return 200', async () => {
    const response = await server.inject({
      method: 'GET',
      url: `/preparation/${preparationId}`,
    });

    expect(response.statusCode).toBe(200);
  });

  it('When the preparation status is updated, it should return 200 and the status should be "IN_PROGRESS"', async () => {
    const updateData = { status: 'IN_PROGRESS' };

    const response = await server.inject({
      method: 'PUT',
      url: `/preparation/${preparationId}/status`,
      payload: updateData,
    });

    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.status).toBe(updateData.status);
  });

  it('When the preparation details are updated, it should return 200 and the details should be updated', async () => {
    const updateDetails = { 
      details: {} 
    };

    const response = await server.inject({
      method: 'PUT',
      url: `/preparation/${preparationId}/details`,
      payload: updateDetails,
    });

    expect(response.statusCode).toBe(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.details).toEqual(updateDetails.details);
  });
});
