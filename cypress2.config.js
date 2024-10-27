const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    username: "user_student",
    password: "user"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://sqlverifier-staging-08050d656f7a.herokuapp.com',
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
  },
  projectId: "dcoyx8",
});
