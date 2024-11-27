import { PreparationDetails } from '../value-objects/PreparationDetails'
import { PreparationStatus } from '../value-objects/PreparationStatus'

export class Preparation {
  private id: string | null
  private orderId: string
  private details: PreparationDetails
  private status: PreparationStatus
  private createdBy: string
  private createdAt: Date

  constructor(orderId: string, details: PreparationDetails, status: PreparationStatus, createdBy: string, createdAt: Date) {
    this.id = null
    this.orderId = orderId
    this.details = details
    this.status = status
    this.createdBy = createdBy
    this.createdAt = createdAt
  }

  public getId(): string | null {
    return this.id
  }

  public getOrderId(): string {
    return this.orderId
  }

  public getDetails(): PreparationDetails {
    return this.details
  }

  public getStatus(): PreparationStatus {
    return this.status
  }

  public getCreatedBy(): string {
    return this.createdBy
  }

  public getCreatedAt(): Date {
    return this.createdAt
  }

  public setStatus(status: PreparationStatus): void {
    this.status = status
  }

  public setId(id: string): void {
    this.id = id
  }

  public setDetails(details: PreparationDetails): void {
    this.details = details
  }

  public setCreatedBy(createdBy: string): void {
    this.createdBy = createdBy
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt
  }
}
