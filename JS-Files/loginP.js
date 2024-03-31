const readlineSync = require("readline-sync");
const DB = require("../JS-Files/ourDataBase");
const Page = require("../JS-Files/Page");
const  Server=require("../main")
const SharedMemory=require("../JS-Files/SharedData")

class LoginP extends Page {
  state = "admin";

  password = "password";
  email = "name@example.com";



  userObject = "";

  cache = {
    email: "",
    password: "",
  };

  nextPage = 0;
  systemMsg = "";

  printSubmitManu() {
    console.log(`Options: 
                  0. submit.
                  1. cancel`);
  }

  submitManu(option) {
    this.option = option;
    switch (String(this.option)) {
      case "1":
        this.enterEmailAndPassword();
        break;
      case "2":
        console.log("in case 2");
        break;
      default:
        console.log("in case 3");
        break;
    }
  }

  enterEmailAndPassword() {
    this.cache.email = readlineSync.question("Enter Your Email:");
    console.log(typeof this.email);
    this.cache.password = readlineSync.question("Enter Your Password:");
    console.log(typeof this.email);
    this.userObject = DB.userMap.get(this.cache.email);
    console.log(typeof this.userObject);
    this.setEmail(this.cache.email);
    this.setPassword(this.cache.password);
    this.printSubmitManu();
    this.option = readlineSync.question();
    this.submitManu(this.option);
    this.checkEmailAndPassword(this.cache.email,this.cache.password);
  }

  
  clicks(scenario) {
    switch (scenario.toLowerCase().trim()) {
      case "submit":
        this.submitManu(1);
        break;
      case "go to login page":
        this.goToLoginPage();
        break;
      case "go to registerion page":
        this.goToRegPage();
        break;
      case "return to starting page":
        this.goToStartingPage();
        break;
      case "go to user page":
        this.goToUserPage();
        break;
      default:
        console.log("Invalid option. Please choose an existed option");
    }
  }

  checkEmailAndPassword(email, password) {
    this.cache.email = email;
    console.log("the email is ------>" + this.cache.email);
    this.cache.password = password;
    console.log("the pass is ------>" + this.cache.password);
    let user = DB.userMap.get(this.cache.email);

    if (user != undefined) {
      if (this.cache.password == user.password) {
        let tempState = this.getState();
        SharedMemory.email=email
        switch (tempState) {
          case "admin":
            this.systemMsg = "Admin Successfully Login\n";
            this.goToAdminPage();
            break;
          case "user":
            this.systemMsg = "User Successfully Login\n";
            this.goToUserPage();
            break;
          default:
             this.tempMsg = "";
            break;
        }
      } else {
        this.systemMsg = "incorrect password\n";
      }
    } else {
      this.systemMsg = "this email doesnt exist\n";
    }
    console.log(this.systemMsg);
  }

  goToStartingPage() {
    this.nextPage = 1;
    Server.username = this.email;
  }

  goToUserPage() {
    this.nextPage = 4;
    Server.username = this.email;
  }
  goToAdminPage() {
    this.nextPage = 7;
    Server.username = this.email;
  }
  goToLoginPage() {
    this.nextPage = 3;
  }
  goToRegPage() {
    this.nextPage = 2;
  }

  welcomeMessage() {
    console.log("Login Seccussfully");
  }
  getState() {
    return DB.userMap.get(this.cache.email).type;
  }
  setPassword(password) {
    this.cache.password = password;
  }
  setEmail(email) {
    this.cache.email = email;
  }
  getEmail() {
    return this.email;
  }

  setOption(_option) {
    this.option = readlineSync.question("Enter Your Option: ");
  }
  getOption() {
    return this.option;
  }

  readOption() {
    this.nextPage = 0;
    this.enterEmailAndPassword();
    return this.nextPage;
  }
}

module.exports = LoginP;
