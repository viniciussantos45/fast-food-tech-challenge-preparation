Feature: Adjust preparation status
  As a system user
  I want to update the preparation status
  So that I can track the order's preparation stages

  Scenario: Create a new preparation with status "PENDING"
    Given that an order is created
    Then it should return 201 and the status should be "PENDING"

  Scenario: Update the preparation status to "IN_PROGRESS"
    Given that an order is created
    When the preparation status is updated to "IN_PROGRESS"
    Then it should return 200 and the status should be "IN_PROGRESS"

  Scenario: Update the preparation status to "READY"
    Given that an order is created
    When the preparation status is updated to "READY"
    Then it should return 200 and the status should be "READY"

  Scenario: Update the preparation status to "DELIVERED"
    Given that an order is created
    When the preparation status is updated to "DELIVERED"
    Then it should return 200 and the status should be "DELIVERED"
