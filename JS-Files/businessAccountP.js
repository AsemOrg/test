const readlineSync = require("readline-sync");
const DB = require("./ourDataBase.js");
const Page = require("./Page.js");
const SharedData = require("./SharedData");
const VenuePage = require("./venue");
const EventBudgeting = require("./eventBudgeting");

let eventBudgeting = new EventBudgeting();

class BusinessAccountP extends Page {
  isGoToVenue = false;
  isReturn = false;
  nextPage = 0;

  init() {
    this.isGoToVenue = false;
    this.isReturn = false;
  }

  displayCalendar() {
    DB.reservationMap.forEach((value, key) => {
      if (value.id == SharedData.bussinessID) {
        console.log(
          ` ${VenuePage.makeCol(key)}  | ${VenuePage.makeCol(
            value.email
          )} | ${VenuePage.makeCol(value.id)} | ${VenuePage.makeCol(
            value.startTime
          )} | ${VenuePage.makeCol(value.endTime)} | ${VenuePage.makeCol(
            value.startDate
          )} |  ${VenuePage.makeCol(value.endDate)} |\n`
        );
      }
    });
  }
  goToVenuePage() {
    this.isGoToVenue = true;
    this.nextPage = 11;
  }
  displayExpenseTracking() {
    eventBudgeting.printMenu();
  }
  backspace() {
    this.isReturn = true;
    this.nextPage = 8;
  }

  printMenu() {
    console.log(`
        select the button by enter the number: 
            0: Calendar and Scheduling
            1: Go to venue page
            2: Expense tracking and categorization
            3: return
        `);
  }

  run(option) {
    switch (option.trim()) {
      case "Calendar and Scheduling":
        this.displayCalendar();
        break;
      case "venue":
        this.goToVenuePage();
        break;
      case "Expense tracking and categorization":
        this.displayExpenseTracking();
        break;
      case "return":
        this.backspace();
        break;
      default:
        console.log("invalid data input");
    }
  }
  instructions = [
    "Calendar and Scheduling",
    "venue",
    "Expense tracking and categorization",
    "return",
  ];
  readOption() {
    const option = readlineSync.question("enter option number");
    if (option < 4) this.run(this.instructions[option]);
    return this.nextPage;
  }
}

module.exports = BusinessAccountP;
