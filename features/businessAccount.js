const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const businessAccountP = require("../JS-Files/businessAccountP");
const DB = require("../JS-Files/ourDataBase");
let bAccount = new businessAccountP();
DB.init();

Given("the user is on Business Account page", function () {
  bAccount.openPage();
  console.log("open page");
});

When("select {string} options in Business Account page", function (string) {
  bAccount.printMenue();
  console.log("user select option:" + string);
  bAccount.run(string);
});

Then("displaying upcoming events and important dates.", function () {
  bAccount.displayCalendar();
});

Then("send user to venue page", function () {
  bAccount.goToVenuePage();
});

Then("display all Expense tracking and categorization", function () {
  bAccount.displayExpenseTracking();
});

When(
  "the user enters invalid integer in Business Account Page {int}",
  function (int) {
    console.log("user enter:" + int);
  }
);
When(
  "user select {string} options in Business Account page",
  function (string) {
    bAccount.printMenue();
    console.log("user select option:" + string);
    bAccount.run(string);
  }
);
Then("return him to Business Account page", function () {
  bAccount.openPage();
});

When(
  "the user enters invalid integer in Business Account Page {string}",
  function (string) {
    console.log("user enter:" + string);
  }
);
