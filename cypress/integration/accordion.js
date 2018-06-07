describe("Accordion clicks", () => {
  it("Expands the first Accordion tab", () => {
    cy.visit("http://pcsdemo.c141.digitalriverws.net:8080/example");
    cy
      .get(
        "[data-testid=accordion-default] > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__accordion_header"
      )
      .click();

    cy
      .get(
        "[data-testid=accordion-default] > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__active"
      )
      .should("have.class", "ra_Accordion__active");
  });

  it("Closes the first Accordion tab", () => {
    cy
      .get(
        "[data-testid=accordion-default] > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__accordion_header"
      )
      .click();

    cy
      .get(
        "[data-testid=accordion-default] > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__inactive"
      )
      .should("have.class", "ra_Accordion__inactive");
  });

  it("Opens the second Accordion tab", () => {
    cy
      .get(
        "[data-testid=accordion-default] > .ra_Accordion__accordion > :nth-child(2) > .ra_Accordion__accordion_header"
      )
      .click();

    cy
      .get(
        "[data-testid=accordion-default] > .ra_Accordion__accordion > :nth-child(2) > .ra_Accordion__active"
      )
      .should("have.class", "ra_Accordion__active");
  });

  it("Closes the second Accordion tab", () => {
    cy
      .get(
        "[data-testid=accordion-default] > .ra_Accordion__accordion > :nth-child(2) > .ra_Accordion__accordion_header"
      )
      .click();

    cy
      .get(
        "[data-testid=accordion-default] > .ra_Accordion__accordion > :nth-child(2) > .ra_Accordion__inactive"
      )
      .should("have.class", "ra_Accordion__inactive");
  });

  it("Opens all Accordion tabs when 'Expand All' is clicked", () => {
    cy.get(".ra_Accordion__expandAll").click();

    cy
      .get(
        "[data-testid=accordion-expandAll] > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__active"
      )
      .should("have.class", "ra_Accordion__active");

    cy
      .get(
        "[data-testid=accordion-expandAll] > .ra_Accordion__accordion > :nth-child(2) > .ra_Accordion__active"
      )
      .should("have.class", "ra_Accordion__active");
  });

  it("Closes all Accordion tabs when 'Expand All' is clicked", () => {
    cy.get(".ra_Accordion__expandAll").click();

    cy
      .get(
        "[data-testid=accordion-expandAll] > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__inactive"
      )
      .should("have.class", "ra_Accordion__inactive");

    cy
      .get(
        "[data-testid=accordion-expandAll] > .ra_Accordion__accordion > :nth-child(2) > .ra_Accordion__inactive"
      )
      .should("have.class", "ra_Accordion__inactive");
  });

  it("Doesn't expand when is disabled", () => {
    cy
      .get(
        "[data-testid=accordion-disabled] > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__accordion_header"
      )
      .click();

    cy
      .get(
        "[data-testid=accordion-disabled] > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__inactive"
      )
      .should("have.class", "ra_Accordion__inactive");
  });
  it("Has Label centered in the Accordion titles with centered prop", () => {
    cy
      .get(
        "[data-testid=accordion-titleCentered] > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__accordion_header"
      )
      .should("have.class", "ra_Accordion__centerAlign");
    cy
      .get(
        "[data-testid=accordion-titleCentered] > .ra_Accordion__accordion > :nth-child(3) > .ra_Accordion__accordion_header"
      )
      .should("have.class", "ra_Accordion__centerAlign");
    cy
      .get(
        "[data-testid=accordion-titleCentered] > .ra_Accordion__accordion > :nth-child(3) > .ra_Accordion__accordion_header"
      )
      .should("have.class", "ra_Accordion__centerAlign");
  });
});
