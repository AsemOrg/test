Feature: Register page

   Scenario: valid registerion
       Given the user is in the registerion page
       When the user fills all attribute ( name , email ,password,..ect) with valid inputs
       And clicks on submit option
       Then redirect him to login page

   Scenario Outline: invalid input registerion
       Given the user is in the registerion page
       When the user enter at least invalid inputs <email> <username> <password>
       And clicks on submit option
       Then the system should display a message <message> to warn him
       And user should remain on the registerion page
       Examples:
           | email                    | username | password      | message                   |
           | 'asemhesham55gmail.com'  | 'asem'   | 'Saitama@123' | 'this email is invalid'   |
           | 'asemhesham55@gmailcom'  | 'asem'   | 'Saitama@123' | 'this email is invalid'   |
           | 'asemhesham55gmailcom'   | 'asem'   | 'Saitama@123' | 'this email is invalid'   |
           | 'asemhesham55@gmail.com' | 'as'     | 'Saitama@123' | 'invalid username'        |
           | 'asemhesham55gmail.com'  | 'as'     | 'Saitama@123' | 'this email is invalid'   |
           | 'asemhesham55@gmailcom'  | 'as'     | 'Saitama@123' | 'this email is invalid'   |
           | 'asemhesham55gmailcom'   | 'as'     | 'Saitama@123' | 'this email is invalid'   |
           | 'asemhesham55@gmail.com' | 'asem'   | 'ben@123'     | 'the password is invalid' |
           | 'asemhesham55gmail.com'  | 'asem'   | 'Be@0'        | 'this email is invalid'   |
           | 'asemhesham55@gmailcom'  | 'asem'   | 'saitama@123' | 'this email is invalid'   |
           | 'asemhesham55gmailcom'   | 'asem'   | 'saitama123'  | 'this email is invalid'   |
           | ''                       | 'asem'   | 'Ben@10'      | 'this email is invalid'   |
           | 'asemhesham55@gmail.com' | ''       | 'Ben@10'      | 'invalid username'        |
           | ''                       | ''       | 'Ben@10'      | 'this email is invalid'   |
           | 'asemhesham55@gmail.com' | 'asem'   | ''            | "the password is invalid" |
           | ''                       | 'asem'   | ''            | 'this email is invalid'   |
           | 'asemhesham55@gmail.com' | ''       | ''            | 'invalid username'        |
           | ''                       | ''       | ''            | 'this email is invalid'   |


    Scenario: email already taken
        Given the user is in the registerion page
        When the user enter an email that is already taken
        And clicks on submit option
        Then the system should display a message 'this email is invalid' to warn him
        And user should remain on the registerion page

    Scenario: weak password
        Given the user is in the registerion page
        When user enters a valid email
        And user enters a weak password
        Then the system should display a message 'the password is invalid' to warn him
        And user should remain on the registerion page

    Scenario: go to login page
        Given the user is in the registerion page
        When clicks on login page button
        Then send the user to login page

    Scenario: return to Start Page
        Given the user is in the registerion page
        When the user clicks on the return option
        Then redirect him to Start Page
