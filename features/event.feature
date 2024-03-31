Feature: Event Creation and Management

    Scenario: add new event
        Given the user navicates to event page
        When clicks on "add new event" option in evenet page
        And the user fill all data to add event
        Then display a message "add event successfully"
        And reture user to Event management page

    Scenario: add existed event
        Given the user navicates to event page
        When clicks on "add new event" option in evenet page
        And the user fill data with existed event
        Then display message "Error: this event already exist"
        And reture user to Event management page

    Scenario: add event with invalid input
        Given the user navicates to event page
        When clicks on "add new event" option in evenet page
        And the user fill data with invalid input 
        Then display message "Error: invalid data input"
        And reture user to Event management page        
   
    Scenario: modify event 
        Given the user navicates to event page
        When clicks on "update event" option in evenet page
        And the user fill data to update 
        Then display message "event updated successfully"
        And reture user to Event management page

    Scenario: modify unexisted event  
        Given the user navicates to event page
        When clicks on "update event" option in evenet page
        And the user enter ID that does not exist
        Then display message "Error: try to update unexisted event"
        And reture user to Event management page      
    
    Scenario: modify event with invalid data
        Given the user navicates to event page
        When clicks on "update event" option in evenet page
        And the user fill data to update with invalid data
        Then display message "Error: invalid data input"
        And reture user to Event management page

    Scenario: delete event
        Given the user navicates to event page
        When clicks on "delete event" option in evenet page
        And the user enter ID to delete
        Then display message "event deleted successfully"
        And reture user to Event management page

    Scenario: delete event
        Given the user navicates to event page
        When clicks on "delete event" option in evenet page
        And the user enter unexisted ID to delete
        Then display message "Error: invalid ID input"
        And reture user to Event management page

    Scenario: return
        Given the user navicates to event page
        When user select "return" options in event management page
        Then back to user page  

    Scenario Outline: Invalid input
        Given the user navicates to event page
        When the user enters invalid integer in event management page Page <input>
        Then display a message "invalid input enterd, plase inter again" 
        And reture user to Event management page
        Examples:
            | input |
            | 13    |
            | 'f'   |
            | -13   |
        