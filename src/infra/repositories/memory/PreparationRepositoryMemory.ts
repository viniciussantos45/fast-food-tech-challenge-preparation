import { PreparationDTO } from '@/core/dtos/PreparationDTO'
import { IPreparationRepository } from '@/core/repositories/PreparationRepository'

export class PreparationRepositoryMemory implements IPreparationRepository {
  public preparations: PreparationDTO[] = []

  async savePreparation(preparation: PreparationDTO): Promise<PreparationDTO> {
    preparation.id = (this.preparations.length + 1).toString()
    preparation.createdAt = new Date()
    this.preparations.push(preparation)
    return preparation
  }

  async getPreparationById(preparationId: string): Promise<PreparationDTO> {
    const preparation = this.preparations.find((prep) => prep.id === preparationId)

    if (preparation) {
      return preparation
    }

    throw new Error('Preparation not found')
  }

  async listPreparations(): Promise<PreparationDTO[]> {
    return this.preparations.map(this.toDTO)
  }

  async updatePreparation(preparation: PreparationDTO): Promise<PreparationDTO> {
    const index = this.preparations.findIndex((prep) => prep.id === preparation.id)
    if (index !== -1) {
      this.preparations[index] = preparation
      return preparation
    }

    throw new Error('Preparation not found')
  }

  async deletePreparation(preparationId: string): Promise<void> {
    this.preparations = this.preparations.filter((prep) => prep.id !== preparationId)
  }

  private toDTO(preparation: PreparationDTO): PreparationDTO {
    return {
      id: preparation.id,
      orderId: preparation.orderId,
      details: preparation.details,
      status: preparation.status,
      createdAt: preparation.createdAt
    }
  }
}
