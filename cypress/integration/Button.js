describe("Button tests", () => {
  it("Primary Button renders default colors, text, and can be clicked", () => {
    cy.visit("/");

    cy
      .get("[data-testid=button-primary]")
      .should("have.class", "ra_Button__primary")
      .and("have.css", "background-color")
      .and("match", /rgb\(0, 167, 225\)/);

    cy.get("[data-testid=button-primary]").contains("Primary");

    // Simulating css pseudo selector doesn't currently work in Cypress
    cy
      .get("[data-testid=button-primary]")
      .trigger("mouseover")
      .should("have.css", "background-color")
      .and("match", /rgb\(0, 129, 174\)/);
  });

  it("Secondary Button renders default colors and text", () => {
    cy
      .get("[data-testid=button-secondary]")
      .should("have.class", "ra_Button__secondary")
      .and("have.css", "background-color")
      .and("match", /rgb\(0, 48, 88\)/);

    cy.get("[data-testid=button-secondary]").contains("Secondary");
  });
});
