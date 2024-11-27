import { PreparationUseCase } from '@/core/domain/use-cases/PreparationUseCase'
import { PreparationDetails } from '@/core/domain/value-objects/PreparationDetails'
import { PreparationStatus } from '@/core/domain/value-objects/PreparationStatus'
import { PreparationRepository } from '@/infra/repositories/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'

const preparationUseCase = new PreparationUseCase(new PreparationRepository())

export async function createPreparation(
  request: FastifyRequest<{ Body: { orderId: string; details: PreparationDetails } }>,
  reply: FastifyReply
): Promise<void> {
  const { orderId, details } = request.body
  const preparation = await preparationUseCase.createPreparation(orderId, details)
  reply.status(201).send(preparation)
}

export async function listPreparations(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const preparations = await preparationUseCase.listPreparations()
  reply.status(200).send(preparations)
}

export async function getPreparationById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
): Promise<void> {
  const { id } = request.params
  const preparation = await preparationUseCase.getPreparationById(id)
  reply.status(200).send(preparation)
}

export async function updatePreparationStatus(
  request: FastifyRequest<{ Params: { id: string }; Body: { status: PreparationStatus } }>,
  reply: FastifyReply
): Promise<void> {
  const { id } = request.params
  const { status } = request.body
  const preparation = await preparationUseCase.updatePreparationStatus(id, status)
  reply.status(200).send(preparation)
}

export async function updatePreparationDetails(
  request: FastifyRequest<{ Params: { id: string }; Body: { details: PreparationDetails } }>,
  reply: FastifyReply
): Promise<void> {
  const { id } = request.params
  const { details } = request.body
  const preparation = await preparationUseCase.updatePreparationDetails(id, details)
  reply.status(200).send(preparation)
}

export async function deletePreparation(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
  const { id } = request.params
  await preparationUseCase.deletePreparation(id)
  reply.status(204).send()
}
