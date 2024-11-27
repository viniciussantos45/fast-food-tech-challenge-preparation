import { PreparationDTO } from '@/core/dtos/PreparationDTO'
import { IPreparationRepository } from '@/core/repositories/PreparationRepository'
import { Combo } from '@/shared-kernel/entities/Combo'
import { Preparation } from '../entities/Preparation'
import { PreparationDetails } from '../value-objects/PreparationDetails'
import { PreparationStatus } from '../value-objects/PreparationStatus'

export class PreparationUseCase {
  private preparationRepository: IPreparationRepository

  constructor(preparationRepository: IPreparationRepository) {
    this.preparationRepository = preparationRepository
  }

  private toDomain(preparation: PreparationDTO): Preparation {
    return new Preparation(
      preparation.orderId,
      new PreparationDetails(new Combo()),
      PreparationStatus[preparation.status as keyof typeof PreparationStatus],
      preparation.createdAt
    )
  }

  public async createPreparation(orderId: string, details: PreparationDetails): Promise<Preparation> {
    const preparation = new Preparation(orderId, details, PreparationStatus.PENDING, new Date())

    const savePreparation = await this.preparationRepository.savePreparation({
      orderId: preparation.getOrderId(),
      details: preparation.getDetails(),
      status: preparation.getStatus(),
      createdAt: preparation.getCreatedAt()
    })

    const preparationId = savePreparation.id

    if (!preparationId) {
      throw new Error('Preparation ID is null')
    }

    const preparationEntity = this.toDomain(savePreparation)

    preparationEntity.setId(preparationId)

    return preparationEntity
  }

  public async getPreparationById(preparationId: string): Promise<Preparation> {
    const preparationEntity = this.toDomain(await this.preparationRepository.getPreparationById(preparationId))

    preparationEntity.setId(preparationId)

    return preparationEntity
  }

  public async listPreparations(): Promise<Preparation[]> {
    return (await this.preparationRepository.listPreparations()).map(this.toDomain)
  }

  public async updatePreparationStatus(preparationId: string, status: PreparationStatus): Promise<Preparation> {
    const preparation = this.toDomain(await this.preparationRepository.getPreparationById(preparationId))

    preparation.setStatus(status)

    await this.preparationRepository.updatePreparation({
      id: preparationId,
      orderId: preparation.getOrderId(),
      details: preparation.getDetails(),
      status: preparation.getStatus(),
      createdAt: preparation.getCreatedAt()
    })

    return preparation
  }

  public async updatePreparationDetails(preparationId: string, details: PreparationDetails): Promise<Preparation> {
    const preparation = this.toDomain(await this.preparationRepository.getPreparationById(preparationId))

    preparation.setDetails(details)

    await this.preparationRepository.updatePreparation({
      id: preparationId,
      orderId: preparation.getOrderId(),
      details: preparation.getDetails(),
      status: preparation.getStatus(),
      createdAt: preparation.getCreatedAt()
    })

    return preparation
  }

  public async deletePreparation(preparationId: string): Promise<void> {
    const preparation = await this.preparationRepository.getPreparationById(preparationId)
    if (preparation && preparation.id) {
      return await this.preparationRepository.deletePreparation(preparation.id)
    }
  }
}
