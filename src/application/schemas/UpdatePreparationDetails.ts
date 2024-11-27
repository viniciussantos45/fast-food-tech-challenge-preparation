import { FastifySchema } from 'fastify'

export const updatePreparationDetailsSchema: FastifySchema = {
  description: 'Atualiza os detalhes de uma preparação',
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
      details: { type: 'object' }
    },
    required: ['details']
  },
  response: {
    200: {
      description: 'Detalhes da preparação atualizados',
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
