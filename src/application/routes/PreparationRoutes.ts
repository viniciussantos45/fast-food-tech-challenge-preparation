import { FastifyInstance } from 'fastify'
import {
  createPreparation,
  deletePreparation,
  getPreparationById,
  listPreparations,
  updatePreparationDetails,
  updatePreparationStatus
} from '../controllers/PreparationController'
import { createPreparationSchema } from '../schemas/CreatePreparation'
import { deletePreparationSchema } from '../schemas/DeletePreparation'
import { getPreparationByIdSchema } from '../schemas/GetPreparationById'
import { listPreparationsSchema } from '../schemas/ListPreparations'
import { updatePreparationDetailsSchema } from '../schemas/UpdatePreparationDetails'
import { updatePreparationStatusSchema } from '../schemas/UpdatePreparationStatus'

export const preparationRoutes = (fastify: FastifyInstance) => {
  // POST /preparation
  fastify.post(
    '/preparation',
    {
      schema: createPreparationSchema
    },
    createPreparation
  )

  // GET /preparations
  fastify.get(
    '/preparations',
    {
      schema: listPreparationsSchema
    },
    listPreparations
  )

  // GET /preparation/:id
  fastify.get(
    '/preparation/:id',
    {
      schema: getPreparationByIdSchema
    },
    getPreparationById
  )

  // PUT /preparation/:id/status
  fastify.put(
    '/preparation/:id/status',
    {
      schema: updatePreparationStatusSchema
    },
    updatePreparationStatus
  )

  // PUT /preparation/:id/details
  fastify.put(
    '/preparation/:id/details',
    {
      schema: updatePreparationDetailsSchema
    },
    updatePreparationDetails
  )

  // DELETE /preparation/:id
  fastify.delete(
    '/preparation/:id',
    {
      schema: deletePreparationSchema
    },
    deletePreparation
  )
}
