const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const ProfileP = require("../JS-Files/profileP");
const DB = require("../JS-Files/ourDataBase");
let profile = new ProfileP();
DB.init();

Given("the user in Profile page", function () {
  profile.openPage();
  console.log("open page");
});

When("select {string} option", function (string) {
  profile.printMenu();
  console.log("-----" + string);
  profile.run(string);
});

Then("send the user to my account page", function () {
  profile.myAccount();
});

Then("the system will display all notification for the user", function () {
  profile.displayNotification();
});

Then("the system will display all Reservation for all event", function () {
  profile.displayRevelation();
});

Then("redirect him to user home page", function () {
  profile.returnBack();
});

Then("send the user to Starting page", function () {
  profile.logout();
});

When("the user enters invalid integer in Profile Page {int}", function (int) {
  console.log("the option is:" + int);
  profile.run(String(int));
});

Then("display a message {string}", function (string) {
  console.log(string);
});

Then("return him to profile page", function () {
  profile.openPage();
});

When(
  "the user enters invalid integer in Profile Page {string}",
  function (string) {
    console.log("the option is:" + string);
    profile.run(string);
  }
);
