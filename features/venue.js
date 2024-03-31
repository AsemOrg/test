const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const venuePage = require("../JS-Files/venue");
let venue = new venuePage();
const DB = require("../JS-Files/ourDataBase");
DB.init();
Given("the user logged into venue page", function () {
  venue.openPage();
  console.log("open page");
});

When("the user click on {string} button", function (string) {
  venue.printMenu();
  console.log("user choose " + string + " option");
});

Then("the system display all venue", function () {
  venue.viewVenue();
});

Then("return user to venue page", function () {
  venue.openPage();
});

When("the user chooses an attribute to search", function () {
  venue.searchByAtteibute();
});

When("and book a valid place", function () {
  venue.bookVenue(
    "asemhesham@gmail.com",
    "101",
    "3:00",
    "4:00",
    "20/04/2003",
    "20/04/2003"
  );
});

Then("display masseg {string}", function (string) {
  console.log(string);
});

When("and book an invalid place", function () {
  venue.bookVenue("", "101", "3:00", "4:00", "20/04/2003", "20/04/2003");
});

When(
  "admin fill all venue attribute \\(capacity,price,amenity)",
  function () {
    let amenities = ["chairs","bathroom"];
    DB.insertVenue("103","Venue C","City C","100","100$",amenities,"101");
    
  }
);

When("admin fill all venue attribute with existed place", function () {
  let amenities = ["chairs","bathroom"];
  DB.insertVenue("101","Venue a","City C","100","100$",amenities,"101");
});

When("admin fill all venue attribute with invalid input", function () {
  let amenities = ["chairs","bathroom"];
  DB.insertVenue("","Venue C","City C","","100$",amenities,"101");
});

When("select venue to delete", function () {
  venue.deleteVenue('101');
});

When("select venue does not exist to delete", function () {
  venue.deleteVenue('108');
});

Then("back the user to user home page", function () {});

When("the user enters invalid integer in venue Page {int}", function (int) {
  console.log("the option is:" + int);
  venue.clickButton();
});

When(
  "the user enters invalid integer in venue Page {string}",
  function (string) {
    console.log("the option is:" + string);
    venue.clickButton();
  }
);
