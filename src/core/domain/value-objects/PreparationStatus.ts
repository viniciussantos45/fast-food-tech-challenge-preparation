export enum PreparationStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
  DELIVERED = 'DELIVERED'
}

export const PaymentStatusMessage = {
  [PreparationStatus.PENDING]: 'Preparation pending',
  [PreparationStatus.IN_PROGRESS]: 'Preparation in progress',
  [PreparationStatus.READY]: 'Preparation ready',
  [PreparationStatus.DELIVERED]: 'Preparation delivered'
}
