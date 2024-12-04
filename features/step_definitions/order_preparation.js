const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')

// Mock preparation statuses
const PREPARATION_STATUSES = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  READY: 'READY',
  DELIVERED: 'DELIVERED'
}

Given('an order is created', function () {
  // Mock preparation object
  this.preparation = {
    id: 1,
    orderId: 'order-123',
    status: PREPARATION_STATUSES.PENDING,
    createdAt: new Date()
  }

  assert.ok(this.preparation, 'Preparation should be created')
  assert.strictEqual(this.preparation.status, PREPARATION_STATUSES.PENDING, 'Initial status should be PENDING')
})

When('the preparation status is updated to {string}', function (newStatus) {
  // Simulate status update
  this.preparation.status = PREPARATION_STATUSES[newStatus]
})

Then('the preparation should be created with status {string}', function (expectedStatus) {
  assert.strictEqual(
    this.preparation.status,
    PREPARATION_STATUSES[expectedStatus],
    `Status should be ${expectedStatus}`
  )
})

Then('the status should be {string}', function (expectedStatus) {
  assert.strictEqual(
    this.preparation.status,
    PREPARATION_STATUSES[expectedStatus],
    `Status should be updated to ${expectedStatus}`
  )
})
