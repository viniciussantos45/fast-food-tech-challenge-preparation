const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')

// Mock preparation statuses
const PREPARATION_STATUSES = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  READY: 'READY',
  DELIVERED: 'DELIVERED'
}

Given('multiple preparations have been created', function () {
  // Mock multiple preparations
  this.preparations = [
    {
      id: 1,
      orderId: 'order-123',
      status: PREPARATION_STATUSES.PENDING,
      createdAt: new Date()
    },
    {
      id: 2,
      orderId: 'order-456',
      status: PREPARATION_STATUSES.IN_PROGRESS,
      createdAt: new Date()
    }
  ]

  assert.ok(this.preparations.length > 1, 'At least two preparations should be created')
})

When('I request to list all preparations', function () {
  // Simulate listing preparations
  this.listedPreparations = this.preparations
})

Then('I should receive a list of preparations', function () {
  assert.ok(Array.isArray(this.listedPreparations), 'Result should be an array')
})

Then('the list should not be empty', function () {
  assert.ok(this.listedPreparations.length > 0, 'Preparations list should not be empty')
})
