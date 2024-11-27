import { IPreparationRepository } from '@/core/repositories/PreparationRepository'
import { Preparation } from '../entities/Preparation'
import { PreparationDetails } from '../value-objects/PreparationDetails'
import { PreparationStatus } from '../value-objects/PreparationStatus'

export class PreparationUseCase {
  private preparationRepository: IPreparationRepository

  constructor(preparationRepository: IPreparationRepository) {
    this.preparationRepository = preparationRepository
  }

  public async createPreparation(orderId: string, details: PreparationDetails): Promise<Preparation> {
    const preparation = new Preparation(orderId, details, PreparationStatus.PENDING, 'system', new Date())
    return this.preparationRepository.savePreparation(preparation)
  }

  public async getPreparationById(preparationId: string): Promise<Preparation> {
    return this.preparationRepository.getPreparationById(preparationId)
  }

  public async listPreparations(): Promise<Preparation[]> {
    return this.preparationRepository.listPreparations()
  }

  public async updatePreparationStatus(preparationId: string, status: PreparationStatus): Promise<Preparation> {
    const preparation = await this.preparationRepository.getPreparationById(preparationId)
    preparation.setStatus(status)
    return this.preparationRepository.updatePreparation(preparation)
  }

  public async updatePreparationDetails(preparationId: string, details: PreparationDetails): Promise<Preparation> {
    const preparation = await this.preparationRepository.getPreparationById(preparationId)
    preparation.setDetails(details)
    return this.preparationRepository.updatePreparation(preparation)
  }

  public async deletePreparation(preparationId: string): Promise<void> {
    const preparation = await this.preparationRepository.getPreparationById(preparationId)
    return this.preparationRepository.deletePreparation(preparation)
  }
}
