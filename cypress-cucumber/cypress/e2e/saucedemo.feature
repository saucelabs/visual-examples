@smoke
Feature: Sauce Visual Demo

  I want to showcase Sauce Visual

  Scenario: Open Login Page
    When on Sauce Demo Page
    Then ".login_container" should be visible
    Then I capture a screenshot named "login-page"

  Scenario: Login as a User
    When on Sauce Demo Page
    Then I log in as "standard_user" with a screenshot
    Then ".inventory_list" should be visible
    Then I capture a screenshot named "inventory-list"

  Scenario: Locked User
    When on Sauce Demo Page
    Then I log in as "locked_out_user"
    Then I capture a screenshot named "Locked-User-Error-Message"
