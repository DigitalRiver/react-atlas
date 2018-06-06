describe("Datepicker tests", () => {
  it("Datepicker should have default value of today's date", () => {
    cy.visit("/");

    const defaultDate = Cypress.moment().format("MM/DD/YYYY");
    console.log("TEXT IS: ", defaultDate);
  });
});
