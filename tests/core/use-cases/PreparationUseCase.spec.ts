import { PreparationUseCase } from '@/core/domain/use-cases/PreparationUseCase'
import { PreparationDetails } from '@/core/domain/value-objects/PreparationDetails'
import { PreparationStatus } from '@/core/domain/value-objects/PreparationStatus'
import { PreparationRepositoryMemory } from '@/infra/repositories/memory/PreparationRepositoryMemory'
import { Combo } from '@/shared-kernel/entities/Combo'
import { beforeEach, describe, expect, it } from 'vitest'

let preparationRepositoryMemory: PreparationRepositoryMemory
let preparationUseCase: PreparationUseCase

describe('Preparation', () => {
  beforeEach(() => {
    preparationRepositoryMemory = new PreparationRepositoryMemory()
    preparationUseCase = new PreparationUseCase(preparationRepositoryMemory)
  })

  it('should be able to create a new preparation', async () => {
    const details = new PreparationDetails(new Combo())
    const preparation = await preparationUseCase.createPreparation('order-1', details)

    expect(preparation).toBeDefined()
    expect(preparationRepositoryMemory.preparations).toHaveLength(1)
    expect(preparation.getOrderId()).toBe('order-1')
    expect(preparation.getStatus()).toBe(PreparationStatus.PENDING)
  })

  it('should be able to get a preparation by id', async () => {
    const details = new PreparationDetails(new Combo())
    const createdPreparation = await preparationUseCase.createPreparation('order-1', details)
    const preparationId = createdPreparation.getId()
    if (preparationId === null) {
      throw new Error('Preparation ID is null')
    }
    const fetchedPreparation = await preparationUseCase.getPreparationById(preparationId)

    expect(fetchedPreparation).toBeDefined()
    expect(fetchedPreparation.getId()).toBe(createdPreparation.getId())
  })

  it('should be able to list all preparations', async () => {
    await preparationUseCase.createPreparation('order-1', new PreparationDetails(new Combo()))
    await preparationUseCase.createPreparation('order-2', new PreparationDetails(new Combo()))

    const preparations = await preparationUseCase.listPreparations()

    expect(preparations).toBeDefined()
    expect(preparations).toHaveLength(2)
  })

  it('should be able to update preparation status', async () => {
    const details = new PreparationDetails(new Combo())
    const preparation = await preparationUseCase.createPreparation('order-1', details)

    const preparationId = preparation.getId()
    if (preparationId === null) {
      throw new Error('Preparation ID is null')
    }
    await preparationUseCase.updatePreparationStatus(preparationId, PreparationStatus.READY)

    const updatedPreparation = await preparationUseCase.getPreparationById(preparationId)

    expect(updatedPreparation.getStatus()).toBe(PreparationStatus.READY)
  })

  it('should be able to update preparation details', async () => {
    const details = new PreparationDetails(new Combo())
    const preparation = await preparationUseCase.createPreparation('order-1', details)

    const preparationId = preparation.getId()
    if (preparationId === null) {
      throw new Error('Preparation ID is null')
    }

    const newDetails = new PreparationDetails(new Combo())
    await preparationUseCase.updatePreparationDetails(preparationId, newDetails)

    const updatedPreparation = await preparationUseCase.getPreparationById(preparationId)

    expect(updatedPreparation.getDetails()).toStrictEqual(newDetails)
  })

  it('should be able to delete a preparation', async () => {
    const details = new PreparationDetails(new Combo())
    const preparation = await preparationUseCase.createPreparation('order-1', details)

    const preparationId = preparation.getId()

    if (preparationId === null) {
      throw new Error('Preparation ID is null')
    }

    await preparationUseCase.deletePreparation(preparationId)

    const preparations = await preparationUseCase.listPreparations()

    expect(preparations).toHaveLength(0)
  })
})
