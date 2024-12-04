Feature: List Preparations
  As a system user
  I want to retrieve a list of all preparations
  So that I can get an overview of current order preparations

  Scenario: Retrieve list of preparations
    Given multiple preparations have been created
    When I request to list all preparations
    Then I should receive a list of preparations
    And the list should not be empty
