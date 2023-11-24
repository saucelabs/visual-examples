Feature: Check Inventory
  As a user
  I want to ensure that the inventory page functions correctly
  So that I can manage inventory effectively

  Scenario: Checking the inventory page's appearance with ignored regions
    Given I am on the login page
    When I check the page before login
    And I log in with valid credentials
    And I navigate to the inventory page
    Then I should see the correct inventory page layout with ignored regions
