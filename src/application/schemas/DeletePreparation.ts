import { FastifySchema } from 'fastify'

export const deletePreparationSchema: FastifySchema = {
  description: 'Deleta uma preparação',
  tags: ['preparação'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  },
  response: {
    204: {
      description: 'Preparação deletada com sucesso',
      type: 'null'
    }
  }
}
