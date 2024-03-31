const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const LoginP = require("../JS-Files/loginP");
const { cpSync } = require("fs");
let login = new LoginP();

Given("the user is on the login page", function () {
  login.openPage();
});

When("the user enters valid data {string} and {int}", function (string, int) {
  login.checkEmailAndPassword(string, int);
});

When(
  "the user enters valid data {string} and {string}",
  function (string, string2) {
    login.checkEmailAndPassword(string, string2);
  }
);

When(
  "the user enters incorrect {string} or {string}",
  function (string, string2) {
    login.checkEmailAndPassword(string, string2);
  }
);

Then("redirect him to user or admin home page", function () {
  login.clicks("go to user page");
});

Then("display an message {string}", function (string) {
  console.log(string);
});

Then("refresh login page", function () {
  login.clicks("go to login page");
});

Then("back to starting page", function () {
  login.clicks("return to starting page");
});

Then("send the user to registerion page", function () {
  login.clicks("go to registerion page");
});

When("user select {string} options in login page", function (string) {
  login.clicks("return to starting page");
});

When("userthe  enters invalid integer in login Page {int}", function (int) {
  login.clicks(String(int));
});

Then("return him to login page", function () {
  login.openPage();
});

When(
  "the user enters invalid integer in login Page {string}",
  function (string) {
    login.clicks(string)
  }
);

When("the user enters any invalid integer", function () {
  console.log("invalid input");
});


Then("display message {string}", function (string) {
  console.log(string);
});
