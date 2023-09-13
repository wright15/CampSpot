Feature: Guests

  @Guests @Regression
  Scenario: Guests 1
    Given The user navigates to "https://development-9-prototype.campspot.com/"
    Then Guest is defaulted to 2 Adults

  @Guests
  Scenario: Guests 2
    Given The user navigates to "https://development-9-prototype.campspot.com/"
    When Guests is selected
    Then Options should display allowing, update the number of Adults, Children, and Pets
