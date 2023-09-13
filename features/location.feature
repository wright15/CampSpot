Feature: Location

  @Location @Regression
  Scenario: Location contains placeholder and will autocomplete
    Given The user navigates to "https://development-9-prototype.campspot.com/"
    Then Where do you want to go is visible
    When Entering letters AU
    Then Austin Texas autocompletes
