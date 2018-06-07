describe("Alert tests", () => {
  it("Default alerts renders default colors and text", () => {
    cy.visit("/");

    cy
      .get("[data-testid=alert-default]")
      .should("have.class", "ra_Alert__alert")
      .and("have.css", "color")
      .and("match", /rgb\(102, 102, 102\)/);
  });

  it("Renders the children text with multiple inline text elements", () => {
    cy
      .get("[data-testid=alert-multipleInline]")
      .contains(
        "Success! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat nisi non odio pretium imperdiet. Praesent eget quam egestas, mattis orci sit amet, faucibus ipsum. Aliquam viverra vulputate porttitor. Suspendisse potenti. Nullam sit amet massa non nulla rhoncus dictum in ac ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras suscipit luctus tellus, nec finibus justo dignissim ac. Aliquam iaculis libero turpis, quis imperdiet elit consequat eget. In hac habitasse platea dictumst. Aliquam volutpat, nisi eget tincidunt accumsan, eros magna tincidunt tellus, quis accumsan enim turpis sit amet ex. Morbi accumsan, felis sed ultricies molestie, massa odio tristique est, sed eleifend sapien massa in massa. Vestibulum gravida maximus varius. Vivamus a elit consectetur, ornare est in, gravida turpis."
      );
  });

  it("Renders the children text with multiple inline text elements", () => {
    cy
      .get("[data-testid=alert-multipleInline]")
      .should("have.class", "ra_Alert__alert");

    cy
      .get("[data-testid=alert-children] > a > .ra_Button__button")
      .should("be.visible");
  });

  it("Renders different alert types properly", () => {
    it("Renders the children text with multiple inline text elements", () => {
      cy
        .get("[data-testid=alert-success]")
        .should("have.class", ".ra_Alert__success");
      cy
        .get("[data-testid=alert-info]")
        .should("have.class", ".ra_Alert__info");
      cy
        .get("[data-testid=alert-warning]")
        .should("have.class", ".ra_Alert__warning");
      cy
        .get("[data-testid=alert-danger]")
        .should("have.class", ".ra_Alert__danger");
    });
  });

  it("Dismisses the four types of alerts: Success, Info, Warning, and Danger", () => {
    it("Renders the children text with multiple inline text elements", () => {
      cy
        .get("[data-testid=alert-dismiss1] > .ra_Alert__close > span")
        .click()
        .should("not.be.visible");
      cy
        .get("[data-testid=alert-dismiss2] > .ra_Alert__close > span")
        .click()
        .should("not.be.visible");
      cy
        .get("[data-testid=alert-dismiss3] > .ra_Alert__close > span")
        .click()
        .should("not.be.visible");
      cy
        .get("[data-testid=alert-dismiss4] > .ra_Alert__close > span")
        .click()
        .should("not.be.visible");
      cy
        .get("[data-testid=alert-dismiss1] > .ra_Alert__close > span")
        .click()
        .should("not.be.visible");
    });
  });
});
