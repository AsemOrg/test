const readlineSync = require("readline-sync");
const DB = require("../JS-Files/ourDataBase");
const Page = require("../JS-Files/Page.js");
const VenuePage = require("../JS-Files/venue.js");
const SharedData = require("../JS-Files/SharedData");

function isDateInRange(dateToCheck, startDate, endDate) {
  const dateToCheckMs = new Date(dateToCheck).getTime();
  const startDateMs = new Date(startDate).getTime();
  const endDateMs = new Date(endDate).getTime();

  return dateToCheckMs >= startDateMs && dateToCheckMs <= endDateMs;
}

class ProfilePage extends Page {
  isManuDisplaied = false;
  isRevelitionDisplaied = false;
  isMyAccountOpened = false;
  isNotificstion = false;
  isLogout = false;
  isReturnToUserHome = false;
  isuserWarned = false;
  systemMsg = "";
  nextPage = 0;

  init() {
    this.isManuDisplaied = false;
    this.isRevelitionDisplaied = false;
    this.isMyAccountOpened = false;
    this.isNotificstion = false;
    this.isReturnToUserHome = false;
  }

  readOption() {
    this.nextPage = 0;
    let option = readlineSync.question("enter Choice");
    console.log("option:", option + "");
    switch (option + "") {
      case "0":
        this.displayRevelation(SharedData.email);
        readlineSync.question();
        break;
      case "1":
        this.myAccount();
        readlineSync.question();
        break;
      case "2":
        this.displayNotification();
        readlineSync.question();
        break;
      case "3":
        this.nextPage = 1;
        readlineSync.question();
        break;
      case "4":
        this.nextPage = 4;
        readlineSync.question();
        break;
    }
    return this.nextPage;
  }
  logout() {
    this.isLogout = true;
  }
  displayRevelation(email) {
    this.isRevelitionDisplaied = true;
    DB.reservationMap.forEach((value, key) => {
      if (
        value != undefined &&
        value.email != undefined &&
        email != undefined &&
        value.email == email
      ) {
        console.log(
          `${VenuePage.makeCol(key)}  | ${VenuePage.makeCol(
            value.email
          )} | ${VenuePage.makeCol(value.id)} | ${VenuePage.makeCol(
            value.startTime
          )} | ${VenuePage.makeCol(value.endTime)} | ${VenuePage.makeCol(
            value.startDate
          )} |  ${VenuePage.makeCol(value.endDate)} |`
        );
      }
    });
  }
  myAccount() {
    this.isMyAccountOpened = true;
    this.nextPage = 8;
  }
  displayNotification() {
    this.isNotificstion = true;

    DB.reservationMap.forEach((value, key) => {
      if (value.email == SharedData.email) {
        let date1 = value.startDate;
        let date2 = value.endDate;
        let time1 = value.startTime;
        let time2 = value.endTime;

        const [year1, month1, day1] = date1.split("-").map(Number);
        const [year2, month2, day2] = date2.split("-").map(Number);

        const [hours1, minutes1] = time1.split(":").map(Number);
        const [hours2, minutes2] = time2.split(":").map(Number);

        const date1Obj = new Date(year1, month1 - 1, day1, hours1, minutes1);
        const date2Obj = new Date(year2, month2 - 1, day2, hours2, minutes2);

        let currentTime = new Date();
        let oneDayLater = new Date();

        oneDayLater.setDate(currentTime.getDate() + 1);

        if (isDateInRange(date1Obj, currentTime, oneDayLater))
          console.log(
            `the reverition will start soon ${VenuePage.makeCol(
              key
            )}  | ${VenuePage.makeCol(value.email)} | ${VenuePage.makeCol(
              value.id
            )} | ${VenuePage.makeCol(value.startTime)} | ${VenuePage.makeCol(
              value.endTime
            )} | ${VenuePage.makeCol(value.startDate)} |  ${VenuePage.makeCol(
              value.endDate
            )} |\n`
          );
        else if (isDateInRange(date2Obj, currentTime, oneDayLater))
          console.log(
            `the reverition will finish soon ${VenuePage.makeCol(
              key
            )}  | ${VenuePage.makeCol(value.email)} | ${VenuePage.makeCol(
              value.id
            )} | ${VenuePage.makeCol(value.startTime)} | ${VenuePage.makeCol(
              value.endTime
            )} | ${VenuePage.makeCol(value.startDate)} |  ${VenuePage.makeCol(
              value.endDate
            )} |\n`
          );
      }
    });
  }

  returnBack() {
    this.isReturnToUserHome = true;
  }
  printMenu() {
    super.printMenu();
    console.log(`
        select the button by enter the number: 
            0: Revelation
            1: my account
            2: notifycation
            3: logout
            4: return
        `);
  }
  run(theButton) {
    switch (theButton.trim()) {
      case "Reservation":
        this.displayRevelation();
        readlineSync.question();
        break;
      case "my account":
        this.myAccount();
        console.log("in my account case");
        break;
      case "notification":
        this.displayNotification();
        console.log("in notification case");
        readlineSync.question();

        break;
      case "Logout":
        this.logout();
        console.log("in Logout case");
        break;
      case "return":
        this.returnBack();
        console.log("in return case");
        break;
      default:
        this.invalidOption();
        console.log("in invalid input case");
    }
  }
  invalidOption() {
    this.isuserWarned = true;
  }
}
module.exports = ProfilePage;
