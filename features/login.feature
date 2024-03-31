Feature: Login page

    Scenario Outline: user or admin successful login
        Given the user is on the login page
        When the user enters valid data <email> and <password>
        And clicks on submit option
        Then redirect him to user or admin home page
        Examples:
            | email                  | password |
            | 'sayed@hotmail.com'    | 123456   |
            | 'asemhesham@gmail.com' | '123456' |


    Scenario Outline: incorrect email or password
        Given the user is on the login page
        When the user enters incorrect <email> or <password>
        And clicks on submit option
        Then display an message "Wronge Email or Password Data Input"
        And refresh login page
        Examples:
            | email                    | password      |
            | 'asemhesham55gmail.com'  | 'Saitama@123' |
            | 'sayed@hotmail.com'      | '123'         |
            | 'asemhesham55@gmailcom'  | 'Saitama@123' |
            | 'asemhesham55gmailcom'   | 'Saitama@123' |
            | 'asemhesham55@gmail.com' | 'Saitama@123' |
            | 'asemhesham55gmail.com'  | 'Saitama@123' |
            | 'asemhesham55@gmailcom'  | 'Saitama@123' |
            | 'asemhesham55gmailcom'   | 'Saitama@123' |
            | 'asemhesham55@gmail.com' | 'ben@123'     |
            | 'asemhesham55gmail.com'  | 'Be@0'        |
            | 'asemhesham55@gmailcom'  | 'saitama@123' |
            | 'asemhesham55gmailcom'   | 'saitama123'  |
            | ''                       | 'Ben@10'      |
            | 'asemhesham55@gmail.com' | 'Ben@10'      |
            | ''                       | 'Ben@10'      |
            | 'asemhesham55@gmail.com' | ''            |
            | ''                       | ''            |
            | 'asemhesham55@gmail.com' | ''            |
            | ''                       | ''            |

    Scenario: return
        Given the user is on the login page
        When user select "return" options in login page
        Then back to starting page

    Scenario Outline: Invalid input
        Given the user is on the login page
        When the user enters invalid integer in login Page <input>
        Then display a message "invalid input enterd, please inter again"
        And return him to login page
        Examples:
            | input |
            | 13    |
            | 'f'   |
            | -13   |