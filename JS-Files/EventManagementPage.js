const Page = require("../JS-Files/Page.js");
const DB = require("../JS-Files/ourDataBase.js");
const readlineSync = require("readline-sync");
const Server = require("../main");
const PrintData = require("../JS-Files/printData.js");
let printData = new PrintData();
DB.init();

class EventManagementPage extends Page {
  eventID = null;
  eventName = null;
  eventDate = null;
  eventTime = null;
  eventTheme = null;
  eventDescription = null;
  eventCount = null;
  eventType = null;
  venueID = null;

  instructions = [
    "show event",
    "add new event",
    "update event",
    "delete event",
    "return",
  ];

  printMenu() {
    console.log(`options:
                        0. show event.
                        1. add event.
                        2. update event.
                        3. delete event.
                        4. return.`);
  }

  userPage = 0;
  nextPage = 0;
  goToUserPage() {
    this.userPage = 1;
    this.nextPage = 4;
  }
  updateRow = null;
  deleteRow = null;

  warningFlag = 0;
  option = -1;

  setID(id) {
    this.cache.ID = id;
  }
  setName(name) {
    this.cache.name = name;
  }
  setDate(date) {
    this.cache.date = date;
  }
  setTime(time) {
    this.cache.time = time;
  }
  setTheme(theme) {
    this.cache.theme = theme;
  }
  setDescription(discription) {
    this.cache.description = discription;
  }
  setCount(count) {
    this.cache.count = count;
  }
  setType(type) {
    this.cache.type = type;
  }
  setVenueID(venueID) {
    this.cache.venueID = venueID;
  }

  checkEventID(eventID) {
    if (eventID != "" && eventID != undefined && eventID != null) {
      this.cacheSubmit();
      return DB.eventMap.get(eventID) == undefined;
    } else return false;
  }

  isValidInput(value) {
    return value != null && value != undefined && value.toString().trim() != "";
  }
  allInputsValidPase1(eventID, eventName, eventDate, eventTime, eventTheme) {
    return (
      this.isValidInput(eventID) &&
      this.isValidInput(eventName) &&
      this.isValidInput(eventDate) &&
      this.isValidInput(eventTime) &&
      this.isValidInput(eventTheme)
    );
  }
  allInputsValidPase2(eventDescription, eventCount, eventType, venueID) {
    return (
      this.isValidInput(eventDescription) &&
      this.isValidInput(eventCount) &&
      this.isValidInput(eventType) &&
      this.isValidInput(venueID)
    );
  }
  addEvent(
    id,
    name,
    date,
    time,
    theme,
    venueId,
    description,
    attendeeCount,
    eventType
  ) {
    if (
      this.allInputsValidPase1(id, name, date, time, theme) &&
      this.allInputsValidPase2(
        description,
        attendeeCount,
        eventType,
        venueId
      ) &&
      this.checkEventID(id)
    ) {
      DB.insertEvent(
        id,
        name,
        date,
        time,
        theme,
        venueId,
        description,
        attendeeCount,
        eventType
      );
      console.log("*Event Added*");
    } else if (
      this.checkEventID(id) == false &&
      this.allInputsValidPase1(id, name, date, time, theme) &&
      this.allInputsValidPase2(description, attendeeCount, eventType, venueId)
    ) {
      console.log("Error: this event already exist");
    } else {
      console.log("Error: invalid data input, please check on your input");
    }
  }

  editEvent(
    id,
    name,
    date,
    time,
    theme,
    venueId,
    description,
    attendeeCount,
    eventType
  ) {
    if (

      this.checkEventID(id) == false
    ) {
      DB.updateEvent(
        id,
        name,
        date,
        time,
        theme,
        venueId,
        description,
        attendeeCount,
        eventType
      );
      console.log("*Event Updated*");
    } else if (
      this.checkEventID(id) &&
      this.allInputsValidPase1(id, name, date, time, theme) &&
      this.allInputsValidPase2(description, attendeeCount, eventType, venueId)
    ) {
      console.log("Error: this event dose not exist");
    } else {
      console.log("Error: invalid data input, please check on your input");
    }
  }

  selectToDelete() {
    const ID = readlineSync.question("Enter ID To Delete:");
    if (!this.checkEventID(ID)) {
      this.deleteEvent(ID);
    } else {
      console.log("error: try to delete event doesnt exist");
    }
  }

  deleteEvent(id) {
    if (this.checkEventID(id) == false && this.isValidInput(id)) {
      DB.eventMap.delete(id);
      console.log("*Event Deleted*");
    } else if (this.isValidInput(id)) {
      console.log("Error: this event dose not exist");
    } else {
      console.log("error: try to delete event doesnt exist");
    }
  }

  setOption(option) {
    this.option = option;
  }

  cacheSubmit() {
    this.eventID = this.cache.ID;
    this.eventName = this.cache.name;
    this.eventDate = this.cache.date;
    this.venueID = this.cache.venueID;
    this.eventTime = this.cache.time;
    this.eventCount = this.cache.count;
    this.eventTheme = this.cache.theme;
    this.eventDescription = this.cache.description;
    this.eventType = this.cache.type;
  }

  cache = {
    ID: "",
    name: "",
    date: "",
    time: "",
    theme: "",
    description: "",
    count: "",
    type: "",
    venueID: "",
  };

  readData() {
    const ID = readlineSync.question("Enter Your ID: ");
    const name = readlineSync.question("Enter Your Name: ");
    const date = readlineSync.question("Enter Your Date: ");
    const time = readlineSync.question("Enter Your Time: ");
    const theme = readlineSync.question("Enter Your Theme: ");
    const description = readlineSync.question("Enter Your Discription: ");
    const count = readlineSync.question("Enter Your Count: ");
    const type = readlineSync.question("Enter Your Type: ");
    const venueID = readlineSync.question("Enter Your Venue-ID: ");
    this.setID(ID);
    this.setName(name);
    this.setDate(date);
    this.setTime(time);
    this.setTheme(theme);
    this.setDescription(description);
    this.setCount(count);
    this.setType(type);
    this.setVenueID(venueID);
    this.cacheSubmit();
  }
  fillDataToAdd() {
    this.readData();
    this.addEvent(
      this.eventID,
      this.eventName,
      this.eventDate,
      this.eventTime,
      this.eventTheme,
      this.venueID,
      this.eventDescription,
      this.eventCount,
      this.eventType
    );
  }

  selectToUpdate() {
    const ID = readlineSync.question("Enter ID To Update:");
    if (this.isValidInput(ID)) {
      this.readData();
      this.editEvent(
        ID,
        this.eventName,
        this.eventDate,
        this.venueID,
        this.eventTime,
        this.eventTheme,
        this.eventDescription,
        this.eventCount,
        this.eventType
      );
    } else {
      console.log("Error: Invalid ID");
    }
  }
  readOption() {
    const option = readlineSync.question("Enter option number: ");
    if (option < 5) this.run(this.instructions[option]);
    return this.nextPage;
  }

  run(theAction) {
    switch (theAction.trim()) {
      case "show event":
        printData.printEventData(DB.eventMap);
        break;
      case "add new event":
        this.fillDataToAdd();
        break;
      case "update event":
        this.selectToUpdate();
        break;
      case "delete event":
        this.selectToDelete();
        break;
      case "return":
        this.goToUserPage();
      default:
        console.log("invalid data input");
        break;
    }
  }
}
let eve =new EventManagementPage();
printData.printEventData(DB.eventMap);
eve.selectToUpdate();
printData.printEventData(DB.eventMap);
module.exports = EventManagementPage;
