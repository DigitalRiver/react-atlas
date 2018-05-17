describe("Textfield tests", () => {
  it("Default exmaple applies active class when clicked", () => {
    cy.visit("/");
    cy
      .get(
        ":nth-child(2) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > .ra_TextField__textfieldWrapper > :nth-child(1) > div > .ra_TextField__textfield"
      )
      .click();

    cy
      .get(
        ":nth-child(2) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > .ra_TextField__textfieldWrapper > :nth-child(1) > div > .ra_TextField__textfield"
      )
      .should("have.class", "ra_styles__text-input-active");
  });

  it("Default example has value of 'abcDEF123!@#' then typed", () => {
    cy
      .get(
        ":nth-child(2) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > .ra_TextField__textfieldWrapper > :nth-child(1) > div > .ra_TextField__textfield"
      )
      .click()
      .type("abcDEF123!@#");

    cy
      .get(
        ":nth-child(2) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > .ra_TextField__textfieldWrapper > :nth-child(1) > div > .ra_TextField__textfield"
      )
      .should("have.value", "abcDEF123!@#");
  });

  it("Label prop example renders TextField with a label", () => {
    // Click the VIEW CODE to check for label prop
    cy
      .get(
        "#TextField-container > .rsg--root-51 > :nth-child(4) > .rsg--controls-54 > :nth-child(1) > div > .rsg--button-30"
      )
      .click();

    cy
      .get(
        ":nth-child(4) > .rsg--tab-56 > :nth-child(1) > .react-codemirror2 > .CodeMirror"
      )
      .contains(`<TextField label="This is a TextField"/>`);

    cy
      .get(
        ":nth-child(4) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > .ra_TextField__textfieldWrapper > .ra_TextField__label"
      )
      .should("have.class", "ra_TextField__labelSpacing");
  });

  it("Disabled example should have disabled prop and disabled style applied and cannot be editted", () => {
    cy
      .get(
        "#TextField-container > .rsg--root-51 > :nth-child(22) > .rsg--controls-54 > :nth-child(1) > div > .rsg--button-30"
      )
      .click();

    cy
      .get(
        ":nth-child(22) > .rsg--tab-56 > :nth-child(1) > .react-codemirror2 > .CodeMirror"
      )
      .contains(`<TextField disabled/>`);

    cy
      .get(
        ":nth-child(22) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > .ra_TextField__textfieldWrapper > :nth-child(1) > div > input"
      )
      .should("have.class", "ra_TextField__disabled")
      .click()
      .type("Testing disabled")
      .contains("");
  });

  it("Numbers only custom validation prop displays error class", () => {
    cy
      .get(
        "#TextField-container > .rsg--root-51 > :nth-child(28) > .rsg--controls-54 > :nth-child(1) > div > .rsg--button-30"
      )
      .click();

    cy
      .get(
        ":nth-child(28) > .rsg--tab-56 > :nth-child(1) > .react-codemirror2 > .CodeMirror"
      )
      .contains(`validator`);

    cy
      .get(
        ":nth-child(28) > .rsg--preview-53 > :nth-child(1) > :nth-child(1) > .ra_TextField__textfieldWrapper > :nth-child(2) > div > .ra_TextField__textfield"
      )
      .click()
      .type(`abc`)
      .should("have.class", "ra_TextField__invalid");
  });
});
