Feature: Dates

  @Dates @Regression
  Scenario: Dates 1
    Given The user navigates to "https://development-9-prototype.campspot.com/"
    When The Dates field is selected
    Then The calendar should display the current and next month
    Then I can scroll to previous and future months
