Feature: Starting Page

   Scenario: Registerion new account
       Given the user is in the startng page
       When the user enters option 1
       Then transfere him to the registerion page with option

  Scenario: Login to your account
      Given the user is in the startng page
      When the user enters 2
      Then transfere him to the login page with option 2

  Scenario: Exit
      Given the user is in the startng page
      When the user enters 3
      Then exit the program with option 3

   Scenario Outline: Invalid input
       Given the user is in the startng page
       When the user enters invalid integer <input>
       Then display message to warn him
       And reture to the staring page
       Examples:
           | input |
           | 10    |
           | 'a'   |
           | -10   |
