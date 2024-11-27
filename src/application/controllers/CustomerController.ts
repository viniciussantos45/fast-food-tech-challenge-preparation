import { FastifyReply, FastifyRequest } from 'fastify'

import { CustomerUseCase } from '@/core/domain/use-cases/CustomerUseCase'
import { CustomerRepository } from '@/infra/repositories/prisma'
import { CustomerCreateDto } from '../dtos/CustomerDtos'

const customerRepository = new CustomerRepository()
const customerUseCase = new CustomerUseCase(customerRepository)

export async function registerCustomer(request: FastifyRequest<{ Body: CustomerCreateDto }>, reply: FastifyReply): Promise<void> {
  const { cpf, name, email } = request.body

  await customerUseCase.registerCustomer(cpf, name, email)

  reply.status(201).send()
}

export async function identifyCustomer(request: FastifyRequest<{ Params: { cpf: string } }>, reply: FastifyReply) {
  const { cpf } = request.params

  const customer = await customerUseCase.identifyCustomer(cpf)

  if (!customer) {
    reply.status(404).send({ message: 'Customer not found' })
    return
  }

  reply.status(200).send(customer)
}

export async function updateCustomer(request: FastifyRequest<{ Body: CustomerCreateDto }>, reply: FastifyReply) {
  const { cpf, name, email } = request.body

  await customerUseCase.updateCustomer(cpf, name, email)

  reply.status(200).send()
}
