Feature: Business Account

    Scenario: Calendar and Scheduling
        Given the user is on Business Account page
        When select "Calendar and Scheduling" options in Business Account page
        Then displaying upcoming events and important dates.

    Scenario: go to venue page
        Given the user is on Business Account page
        When select "venue" options in Business Account page
        Then send user to venue page

    Scenario: Expense tracking and categorization
        Given the user is on Business Account page
        When select "Expense tracking and categorization" options in Business Account page
        Then display all Expense tracking and categorization

    Scenario: return
        Given the user is on Business Account page
        When user select "return" options in Business Account page
        Then back to myAccount page 

    Scenario Outline: Invalid input
        Given the user is on Business Account page
        When the user enters invalid integer in Business Account Page <input>
        Then display a message "invalid input enterd, plase inter again" 
        And return him to Business Account page
        Examples:
            | input |
            | 13    |
            | 'f'   |
            | -13   |          
