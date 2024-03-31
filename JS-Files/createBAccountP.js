const readlineSync = require("readline-sync");
const DB = require("./ourDataBase.js");
const Page = require("./Page.js");
const sharedD = require("./SharedData.js");
DB.init();
class CpaP extends Page {
  pageName = null;
  phoneNumber = null;
  businessType = null;
  email = null;
  myAccountPage = 0;
  nextPage = 0;
  instructions = ["create Business Account", "return"];
  pageNameValid(namePage) {
    if (namePage.trim() == "" || namePage == undefined || namePage == null)
      return false;

    let tempMap = DB.BussinessAccountMap;
    let boolAnswer = true;
    tempMap.forEach((value, key) => {
      let nameCheck = namePage;
      if (value.PageName == nameCheck) boolAnswer = false;
    });
    
    return boolAnswer;
  }

  openMyAccountPage() {
    this.myAccountPage = 1;
    this.nextPage = 8;
  }

  setName(pageName) {
    this.pageName = pageName;
  }
  setPhone(phoneNumber) {
    this.phoneNumber = phoneNumber;
  }
  setType(businessType) {
    this.businessType = businessType;
  }
  setEmail(email) {
    this.email = email;
  }
  isValidPhoneNumber(phoneNumber) {
    const pattern =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return pattern.test(phoneNumber);
  }
  writeData(pageName, phoneNumber, businessType) {
    this.setName(pageName);
    this.setPhone(phoneNumber);
    this.setType(businessType);
    this.setEmail(sharedD.email);
    if (this.pageNameValid(pageName)) {
      DB.insertBussinessAccount(
        this.email,
        pageName,
        phoneNumber,
        businessType
      );
      console.log("Your Page is created 100%");
    }
  }
  isValidInput(value) {
    return value != null && value != undefined && value.toString().trim() != "";
  }
  allInputsValid(pageName, phoneNumber, businessType) {
    return (
      this.isValidInput(pageName) &&
      this.isValidInput(phoneNumber) &&
      this.isValidInput(businessType)
    );
  }
  readData() {
    const namePage = readlineSync.question("Enter Your Page Name:");
    const phoneNumber = readlineSync.question("Enter Your Phone Number:");
    this.selectType();
    if (
      this.allInputsValid(namePage, phoneNumber, this.businessType) &&
      this.isValidPhoneNumber(phoneNumber)
    ) {
      this.writeData(namePage, phoneNumber, this.businessType);
    } else {
      console.log("Error: invalid data input");
    }
  }

  printMenu() {
    console.log(`
    select the button by enter the number: 
      0: Create Business Account
      1: Return to MyAccount Page
      `);
  }

  selectType() {
    console.log(`select your business type
                  1. Art Design.
                  2. Health and Wellness.
                  3. Market place.
                  4. Mobile Apps.
                  5. Education and Training.`);
    const option = readlineSync.question("Enter Your Option: ");
    switch (option) {
      case "1":
        this.setType("Art Design");
        break;
      case "2":
        this.setType("Health and Wellness");
        break;
      case "3":
        this.setType("Market place");
        break;
      case "4":
        this.setType("Mobile Apps");
        break;
      case "5":
        this.setType("Education and Training");
        break;
      default:
        console.log("Invalid data inbut, blease try again.");
    }
  }

  clicks(option) {
    switch (option) {
      case "create Business Account" :
        this.readData();
        break;
      case "return":
        this.openMyAccountPage();
        break;
      default:
        console.log("Invalid option. Please choose an existed option");
    }
  }

  readOption() {
    const option = readlineSync.question("enter option number");
    if (option < 2) this.clicks(this.instructions[option]);
    return this.nextPage
  }
}

// let eve = new CpaP();
// eve.readOption();

module.exports = CpaP;
