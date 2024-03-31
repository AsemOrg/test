const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const UserP = require("../JS-Files/userP");
let user = new UserP();

Given("the User navicates into User page", function () {
  user.openPage();
});

When("user enters option {int}", function (int) {
  console.log("the option is:"+int);
  user.setOPtion(String(int));
  user.run();
});

Then("transfere him to the Event Management page", function () {
  assert.equal(user.eventPage , 1);
  assert.equal(user.nextPage , 5);

});

Then("send User to Profile page", function () {
  assert.equal(user.profilePage , 1);
  assert.equal(user.nextPage , 6);

});

Then("redirect him from user page to Start Page", function () {
  assert.equal(user.startingPage , 1);
  assert.equal(user.nextPage , 1);

});

When("user enters invalid integer {int}", function (int) {
  console.log("the option is:"+int);
  user.setOPtion(String(int));
  user.run();
});

When("user enters invalid integer {string}", function (string) {
  console.log("the option is:"+string);
  user.setOPtion(string);
  user.run();
});

Then("the system display message to warn him", function () {
    assert.equal(user.isOpen,true);
    assert.equal(user.warnTheUser,true);
    console.log("invalid input");

});

Then("reture user to the user page", function () {
  user.run();
  user.reopenPage();
  assert.equal(user.isOpen,true);
  assert.equal(user.eventPage , 0);

});
