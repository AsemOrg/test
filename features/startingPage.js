const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const StartP = require("../JS-Files/startP");
let Start = new StartP();

Given("the user is in the startng page", function () {
  Start.openPage();
});
When("the user enters option {int}", function (int) {
  console.log("the option is: "+int);
  Start.setOption(String(int));
  Start.run();
});

Then("transfere him to the registerion page with option", function () {
  assert.equal(Start.go_to_reg,1);
});

When("the user enters {int}", function (int) {
  console.log("the option is: "+int);
  Start.setOption(String(int));
  Start.run();
});

Then("transfere him to the login page with option {int}", function (int) {
  assert.equal(Start.go_to_login,1);
  assert.equal(Start.nextPage , 3);

});


Then("exit the program with option {int}", function (int) {
  assert.equal(Start._exit,1);
});

When('the user enters invalid integer {int}', function (int) {
  Start.setOption(int);
  Start.run();
});
When('the user enters invalid integer {string}', function (string) {
  Start.setOption(string);
  Start.run();
});

Then("display message to warn him", function () {
  assert.equal(Start.is_open,1);
  console.log("invalid input");
});

Then("reture to the staring page", function () {
  Start.run();
  Start.reopenPage();
  assert.equal(Start.is_open,true);
  assert.equal(Start.nextPage , 0);

});