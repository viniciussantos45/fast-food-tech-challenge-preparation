import { FastifySchema } from 'fastify'

export const updatePreparationStatusSchema: FastifySchema = {
  description: 'Atualiza o status de uma preparação',
  tags: ['preparação'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  },
  body: {
    type: 'object',
    properties: {
      status: { type: 'string' }
    },
    required: ['status']
  },
  response: {
    200: {
      description: 'Status da preparação atualizado',
      type: 'object',
      properties: {
        id: { type: 'string' },
        orderId: { type: 'string' },
        details: { type: 'object' },
        status: { type: 'string' },
        createdBy: { type: 'string' },
        createdAt: { type: 'string' }
      }
    }
  }
}
