const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    idToken: null,
    username: "polalextest",
    password: "123test",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://sqlverifier-live-6e21ca0ed768.herokuapp.com",
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
  },
  projectId: "suoap9",
});
