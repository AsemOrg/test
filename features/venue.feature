Feature: place manegment

    Scenario: view all venue
        Given the user logged into venue page 
        When the user click on "view venue" button
        Then the system display all venue 
        And return user to venue page

    Scenario: booking a valid place
        Given the user logged into venue page
        When the user chooses an attribute to search
        And and book a valid place 
        Then display masseg "the venue is booked successfully" 
        And return user to venue page

    Scenario: booking a invalid place
        Given the user logged into venue page
        When the user chooses an attribute to search
        And and book an invalid place 
        Then display masseg "try to book invalid place" 
        And return user to venue page

    Scenario: add new place
        Given the user logged into venue page
        When the user click on "add new place" button
        And admin fill all venue attribute (capacity,price,amenity)
        Then display masseg "new place was added" 
        And return user to venue page

    Scenario: add exist place
        Given the user logged into venue page
        When the user click on "add new place" button
        And admin fill all venue attribute with existed place
        Then display masseg "error: place already exist" 
        And return user to venue page

    Scenario: add new place with invalid input 
        Given the user logged into venue page
        When the user click on "add new place" button
        And admin fill all venue attribute with invalid input
        Then display masseg "error: invalid data input" 
        And return user to venue page

    Scenario: deleting place
        Given the user logged into venue page
        When the user click on "delete place" button
        And select venue to delete 
        Then display masseg "place deleted successfully"
        And return user to venue page

    Scenario: deleting place does not exist
        Given the user logged into venue page
        When the user click on "delete place" button
        And select venue does not exist to delete 
        Then display masseg "error: cant find this place to delete"
        And return user to venue page

    Scenario: return
        Given the user logged into venue page
        When the user click on "return" button
        Then back the user to user home page

    Scenario Outline: Invalid input
        Given the user logged into venue page
        When the user enters invalid integer in venue Page <input>
        Then display this message "invalid input enterd, plase inter again" 
        And return user to venue page
        Examples:
            | input |
            | 15    |
            | 's'   |
            | -15   |

