import { Combo } from '@/shared-kernel/entities/Combo'

export class PreparationDetails {
  private readonly value: Combo

  constructor(value: Combo) {
    this.value = value
  }

  public getValue(): Combo {
    return this.value
  }
}
