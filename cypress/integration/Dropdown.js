describe("Dropdown tests", () => {
  it("Dropdown should render downward arrow", () => {
    cy.visit("/#dropdown");

    cy.get("[data-testid=dropdown-basic]").should("be.visible");
  });

  it("Dropdown should have cursor: pointer css", () => {
    cy
      .get(".ra_TextField__textfieldWrapper > [data-testid=dropdown-basic]")
      .should("have.css", "cursor")
      .and("match", /pointer/)
      .and("have.css", "color");
  });

  it("Clicking on Dropdown and selecting 'Yes' option should now set the value of Dropdown to 'Yes'", () => {
    cy
      .get(".ra_TextField__textfieldWrapper > [data-testid=dropdown-basic]")
      .click()
      .type("{downarrow}")
      .type("{enter}")
      .should("have.value", "Yes");

    cy.wait(2000);
  });

  it("Clicking on Dropdown and selecting 'No' option should now set the value of Dropdown to 'No'", () => {
    cy.visit("/#dropdown");
    cy
      .get(".ra_TextField__textfieldWrapper > [data-testid=dropdown-basic]")
      .click()
      .type("{downarrow}{downarrow}")
      .type("{enter}")
      .should("have.value", "No");

    cy.wait(2000);
  });

  it("Typing into Dropdown with filter prop should have value of 'Minnesota' when typing in 'Minn', render 'Minnesota' as the only option, and arrowing down to type 'Enter'", () => {
    cy.visit("/#dropdown");
    cy
      .get(".ra_TextField__textfieldWrapper > [data-testid=dropdown-filter]")
      .type("Minn{downarrow}{enter}")
      .should("have.value", "Minnesota");
  });
});
