import { FastifySchema } from 'fastify'

export const createPreparationSchema: FastifySchema = {
  description: 'Cria uma nova preparação',
  tags: ['preparação'],
  body: {
    type: 'object',
    required: ['orderId', 'details'],
    properties: {
      orderId: {
        type: 'string',
        examples: ['12345'],
        description: 'Identificador único do pedido'
      },
      details: {
        type: 'object',
        description: 'Detalhes da preparação',
        properties: {
          /*...*/
        }
      }
    }
  },
  response: {
    201: {
      description: 'Preparação criada com sucesso',
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
