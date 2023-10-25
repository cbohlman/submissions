describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "chris",
      username: "testuser",
      password: "secret",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input[name='Username']").type("testuser");
      cy.get("input[name='Password']").type("secret");
      cy.get("#loginButton").click();
      cy.contains("chris logged in");
    });

    it("fails with incorrect credentials", function () {
      cy.get("input[name='Username']").type("testuser");
      cy.get("input[name='Password']").type("wrong");
      cy.get("#loginButton").click();

      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
      cy.get("html").should("not.contain", "chris logged in");
    });
  });
});
