describe("Alert tests", () => {
  it("Default alerts renders default colors and text", () => {
    cy.visit("/");

    cy
      .get("[data-testid=alert-default]")
      .should("have.class", "ra_Alert__alert")
      .should("have.css", "color")
      .and("match", /rgb(102, 102, 102)/);
  });
});
