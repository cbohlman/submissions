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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "secret" });
    });
    it("A blog can be created", function () {
      cy.contains("New Blog").click();
      cy.get("#titleInput").type("Test Title");
      cy.get("#authorInput").type("Test Author");
      cy.get("#urlInput").type("Test URL");
      cy.contains("Save").click();

      cy.get("html")
        .should("contain", "Test Title")
        .and("contain", "Test Author");
    });
    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Test Title",
          author: "Test Author",
          url: "Test URL",
        });
      });

      it("a blog can be liked", function () {
        cy.contains("View").click();
        cy.get("#likeButton").click();
        cy.get("#likeButton").parent().contains("1");
      });

      it("delete button is visible for logged in user", function () {
        cy.contains("View").click();
        cy.contains("Delete");
      });

      it.only("only the creator can see the delete button", function () {
        cy.contains("Log Out").click();
        const user = {
          name: "test2",
          username: "testuser2",
          password: "secret",
        };
        cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
        cy.login({ username: "testuser2", password: "secret" });
        cy.contains("test2 logged in");
        cy.contains("View").click();
        cy.get("html").should("not.contain", "Delete");
      });
    });
  });
});
