import { FastifySchema } from 'fastify'

export const getPreparationByIdSchema: FastifySchema = {
  description: 'Obtém uma preparação pelo ID',
  tags: ['preparação'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  },
  response: {
    200: {
      description: 'Preparação encontrada',
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
