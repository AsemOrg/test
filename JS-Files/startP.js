const readlineSync = require("readline-sync");
const Page = require("./Page.js");

const RegisitionPage = require("../JS-Files/regP");
const LoginPage = require("../JS-Files/loginP");
let process = require("process");

class StartP extends Page {
  goToOtherPage = 0;
  is_open = false;
  go_to_reg = 0;
  go_to_login = 0;
  _exit = 0;

  option = -1;
  nextPage = 0;
  systemMsg = "";
  instructions = ["Register", "Login", "Exit"];
  printMenu() {
    console.log(`Options:
                    0. Register To Your Account.
                    1. Login to Your Acount.
                    2. Exit`);
  }
  setOption(_option) {
    this.option = _option;
  }
  getOption() {
    return this.option;
  }
  openPage() {
    this.is_open = true;
  }
  closePage() {
    this.is_open = false;
  }
  goToReg() {
    this.go_to_reg = 1;
    this.go_to_login = 0;
    this._exit = 0;
    this.nextPage = 2;
  }
  goToLogin() {
    this.go_to_reg = 0;
    this.go_to_login = 1;
    this._exit = 0;
    this.nextPage = 3;
  }
  goToExit() {
    this.go_to_reg = 0;
    this.go_to_login = 0;
    this._exit = 1;
    process.exit(0);
  }
  
  readOption() {
    const tempOP = readlineSync.question("What is your option");
    this.setOption(tempOP);
    let chioces=[ "Register","Login","Exit"]
    this.run(chioces[tempOP]);

    if (this.go_to_reg) return 2;
    if (this.go_to_login) return 3;
    return this.nextPage;
  }
  run(theAction) {
    console.log(theAction)
    switch (theAction) {
      case "Register":
        this.goToReg();
        break;
      case "Login":
        this.goToLogin();
        break;
      case "Exit":
        this.goToExit();
        break;
      default:
        this.reopenPage();
        break;
    }
  }
  reopenPage() {
    this.go_to_reg = 0;
    this.go_to_login = 0;
    this.is_open = true;
    this._exit = 0;
  }
}

module.exports = StartP;
