Cypress.Commands.add("authorization", () => {
  cy.request({
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    url: "/api/authenticate",
    body: {
      username: "admin_automation",
      password: "admin_automation",
      rememberMe: true,
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    Cypress.env("idToken", response.body.id_token);
  });
});

Cypress.Commands.add("postNewTask", (title, text, answer) => {
  cy.request({
    method: "POST",
    url: "/api/tasks",
    headers: {
      authorization: `Bearer ${Cypress.env("idToken")}`,
    },
    body: {
      title: title,
      text: text,
      answer: answer,
    },
  }).then((response) => {
    expect(response.status).to.equal(201);
    Cypress.env("taskId", response.body.id);
    Cypress.env("taskTitle", response.body.title);
    Cypress.env("taskAnswer", response.body.answer);
    Cypress.env("taskText", response.body.text);
  });
});

Cypress.Commands.add("editTheTask", (id, text, answer, title) => {
  cy.request({
    method: "PUT",
    url: `/api/tasks/${Cypress.env("taskId")}`,
    headers: {
      authorization: `Bearer ${Cypress.env("idToken")}`,
    },
    body: {
      id: id,
      text: text,
      answer: answer,
      title: title,
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
  });
});

Cypress.Commands.add("deleteTheTask", () => {
  cy.request({
    method: "DELETE",
    url: `/api/tasks/${Cypress.env("taskId")}`,
    headers: {
      authorization: `Bearer ${Cypress.env("idToken")}`,
    },
  }).then((response) => {
    expect(response.status).to.equal(204);
  });
});
