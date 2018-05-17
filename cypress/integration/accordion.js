describe("Accordion clicks", () => {
  it("Expands the first Accordion tab", () => {
    cy.visit("/");
    cy
      .get(
        ":nth-child(2) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__accordion_header"
      )
      .click();

    cy
      .get(
        ".rsg--preview-53 > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__active"
      )
      .should("have.class", "ra_Accordion__active");
  });

  it("Closes the first Accordion tab", () => {
    cy
      .get(
        ":nth-child(2) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__accordion_header"
      )
      .click();

    cy
      .get(
        ".rsg--preview-53 > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__inactive"
      )
      .should("have.class", "ra_Accordion__inactive");
  });

  it("Opens the second Accordion tab", () => {
    cy
      .get(
        ":nth-child(2) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ra_Accordion__accordion > :nth-child(2) > .ra_Accordion__accordion_header"
      )
      .click();

    cy
      .get(
        ":nth-child(2) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ra_Accordion__accordion > :nth-child(2) > .ra_Accordion__active"
      )
      .should("have.class", "ra_Accordion__active");
  });

  it("Closes the second Accordion tab", () => {
    cy
      .get(
        ":nth-child(2) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ra_Accordion__accordion > :nth-child(2) > .ra_Accordion__accordion_header"
      )
      .click();

    cy
      .get(
        ":nth-child(2) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ra_Accordion__accordion > :nth-child(2) > .ra_Accordion__inactive"
      )
      .should("have.class", "ra_Accordion__inactive");
  });

  it("Opens all Accordion tabs when 'Expand All' is clicked", () => {
    cy.get(".ra_Accordion__expandAll").click();

    cy
      .get(
        ".rsg--preview-53 > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__active"
      )
      .should("have.class", "ra_Accordion__active");

    cy
      .get(
        ":nth-child(4) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ra_Accordion__accordion > :nth-child(2) > .ra_Accordion__active"
      )
      .should("have.class", "ra_Accordion__active");
  });

  it("Closes all Accordion tabs when 'Expand All' is clicked", () => {
    cy.get(".ra_Accordion__expandAll").click();

    cy
      .get(
        ".rsg--preview-53 > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__inactive"
      )
      .should("have.class", "ra_Accordion__inactive");

    cy
      .get(
        ":nth-child(4) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ra_Accordion__accordion > :nth-child(2) > .ra_Accordion__inactive"
      )
      .should("have.class", "ra_Accordion__inactive");
  });

  it("Doesn't expand when is disabled", () => {
    cy
      .get(
        ":nth-child(14) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__accordion_header"
      )
      .click();

    cy
      .get(
        ":nth-child(14) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > :nth-child(1) > .ra_Accordion__accordion > :nth-child(1) > .ra_Accordion__accordion_header"
      )
      .should("have.class", "ra_Accordion__inactive");
  });
});
