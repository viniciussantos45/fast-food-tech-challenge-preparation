import { FastifySchema } from 'fastify'

export const listPreparationsSchema: FastifySchema = {
  description: 'Lista todas as preparações',
  tags: ['preparação'],
  response: {
    200: {
      description: 'Lista de preparações',
      type: 'array',
      items: {
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
}
