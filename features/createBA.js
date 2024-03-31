const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const createBA = require("../JS-Files/createBAccountP");
const DB = require("../JS-Files/ourDataBase");
const sharedD = require("../JS-Files/SharedData.js");
let createBAccount = new createBA();
DB.init();

Given("the user is on the Create Business Account page", function () {
  createBAccount.openPage();
  console.log("open page");
});
When("clicks on {string} page option", function (string) {
  createBAccount.printMenu();
  // createBAccount.clicks(string);
});

When("the user enters valid data page", function () {
  namePage = 'Al-Najah-UNI';
  phoneNumber = '0599989199';
  pageType = 'company';
  sharedD.email = 'ahmad@gmail.com';
  createBAccount.writeData(namePage, phoneNumber ,pageType);
});

Then("redirect him to myAccount page", function () {
  createBAccount.openMyAccountPage();
});

When("the user enters valid name page that already exist", function () {
  namePage = 'Asem-Hesham';
  phoneNumber = '0599989199';
  pageType = 'company';
  sharedD.email = 'ahmad@gmail.com';
  createBAccount.writeData(namePage, phoneNumber ,pageType);
});

When("the user enters invalid data page like null", function () {
  namePage = '';
  phoneNumber = '0599989199';
  pageType = 'company';
  sharedD.email = 'ahmad@gmail.com';
  createBAccount.writeData(namePage, phoneNumber ,pageType);
});

When(
  "the user enters invalid integer in create Business Account Page {int}",
  function (int) {
    console.log("the option is:" + int);
    createBAccount.clicks(String(int));
  }
);

Then("return him to create Business Account page", function () {
  createBAccount.openPage();
});

When(
  "the user enters invalid integer in create Business Account Page {string}",
  function (string) {
    console.log("the option is:" + string);
    createBAccount.clicks(string);
  }
);

When("user select {string} options", function (string) {
  createBAccount.printMenu();
  createBAccount.clicks(string);
});

Then("back to myAccount page", function () {
  createBAccount.openMyAccountPage();
});
