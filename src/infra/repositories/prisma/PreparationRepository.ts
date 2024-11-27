import { PreparationDTO } from '@/core/dtos/PreparationDTO'
import { IPreparationRepository } from '@/core/repositories/PreparationRepository'
import { Preparation, PrismaClient } from '@prisma/client'

export class PreparationRepository implements IPreparationRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async savePreparation(preparation: PreparationDTO): Promise<PreparationDTO> {
    const savedPreparation = await this.prisma.preparation.create({
      data: preparation
    })
    return this.toDTO(savedPreparation)
  }

  async getPreparationById(preparationId: string): Promise<PreparationDTO> {
    const preparation = await this.prisma.preparation.findUnique({
      where: { id: preparationId }
    })

    if (!preparation) {
      throw new Error('Preparation not found')
    }

    return this.toDTO(preparation)
  }

  async listPreparations(): Promise<PreparationDTO[]> {
    const preparations = await this.prisma.preparation.findMany()
    return preparations.map(this.toDTO)
  }

  async updatePreparation(preparation: PreparationDTO): Promise<PreparationDTO> {
    const updatedPreparation = await this.prisma.preparation.update({
      where: { id: preparation.id },
      data: preparation
    })
    return this.toDTO(updatedPreparation)
  }

  async deletePreparation(preparationId: string): Promise<void> {
    await this.prisma.preparation.delete({
      where: { id: preparationId }
    })
  }

  private toDTO(preparation: Preparation): PreparationDTO {
    return {
      id: preparation.id,
      orderId: preparation.orderId,
      details: preparation.details as object,
      status: preparation.status,
      createdAt: preparation.createdAt
    }
  }
}
