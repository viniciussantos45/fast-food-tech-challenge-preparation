import { FastifyInstance } from 'fastify'

import { preparationRoutes } from './PreparationRoutes'

export const registerRoutes = (fastify: FastifyInstance): void => {
  preparationRoutes(fastify)
}
