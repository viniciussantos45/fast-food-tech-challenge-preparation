import { PreparationDTO } from '../dtos/PreparationDTO'

export interface IPreparationRepository {
  savePreparation(preparation: PreparationDTO): Promise<PreparationDTO>
  getPreparationById(preparationId: string): Promise<PreparationDTO>
  listPreparations(): Promise<PreparationDTO[]>
  updatePreparation(preparation: PreparationDTO): Promise<PreparationDTO>
  deletePreparation(preparationId: string): Promise<void>
}
