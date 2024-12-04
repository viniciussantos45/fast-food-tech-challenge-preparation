Feature: Adjust Preparation Status
  As a system user
  I want to update the preparation status
  So that I can track the order's preparation stages

  Scenario: Create a new preparation with status "PENDING"
    Given an order is created
    Then the preparation should be created with status "PENDING"

  Scenario: Update the preparation status to "IN_PROGRESS"
    Given an order is created
    When the preparation status is updated to "IN_PROGRESS"
    Then the status should be "IN_PROGRESS"

  Scenario: Update the preparation status to "READY"
    Given an order is created
    When the preparation status is updated to "READY"
    Then the status should be "READY"

  Scenario: Update the preparation status to "DELIVERED"
    Given an order is created
    When the preparation status is updated to "DELIVERED"
    Then the status should be "DELIVERED"
