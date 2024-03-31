const readlineSync = require("readline-sync");
const Page = require("../JS-Files/Page");
class UserP extends Page {
  isOpen = false;
  eventPage = 0;
  profilePage = 0;
  startingPage = 0;
  option = -1;

  systemMsg = "";
  nextPage = 0;
  instructions = ["event management page", "profile page", "return"];
  constructor() {
    super();
    this.openPage();
  }
  printMenu() {
    console.log(`Options: 
                  0. event management page
                  1. profile page
                  2. return to Start Page`);
  }

  openPage() {
    this.isOpen = true;
  }
  setOPtion(option) {
    this.option = option;
  }
  goToEventPage() {
    this.eventPage = 1;
    this.profilePage = 0;
    this.startingPage = 0;
    this.nextPage = 5;
  }
  goToProfilePage() {
    this.eventPage = 0;
    this.profilePage = 1;
    this.startingPage = 0;
    this.nextPage = 6;
  }
  goToStartingPage() {
    this.eventPage = 0;
    this.profilePage = 0;
    this.startingPage = 1;

    this.nextPage = 1;
  }
  run(theAction) {
    console.log(theAction);
    switch (theAction) {
      case "event management page":
        this.goToEventPage();
        break;
      case "profile page":
        this.goToProfilePage();
        break;
      case "return":
        this.goToStartingPage();
        break;
      default:
        this.reopenPage();
        break;
    }
  }

  readOption() {
    const option = readlineSync.question("enter option number");
    if (option < 3) this.run(this.instructions[option]);
    return this.nextPage;
  }

  reopenPage() {
    this.eventPage = 0;
    this.profilePage = 0;
    this.startingPage = 0;
    this.isOpen = true;
  }
}

module.exports = UserP;
