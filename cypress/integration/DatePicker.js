describe("Datepicker tests", () => {
  it("Datepicker should have default value of today's date", () => {
    cy.visit("/");

    // Get today's date in javascript

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = mm + "/" + dd + "/" + yyyy;
    const todaysRegexp = new RegExp(today);

    cy
      .get(
        ":nth-child(2) > .rsg--preview-43 > :nth-child(1) > :nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > #datepicker"
      )
      .should("have.attr", "value")
      .and("match", todaysRegexp);
  });

  it("Datepicker clicking on a particular date should change it's value to the selected date", () => {
    // Get today's date in javascript

    cy
      .get(
        "#DatePicker-container > .rsg--root-41 > :nth-child(4) > .rsg--preview-43 > :nth-child(1) > :nth-child(1)"
      )
      .invoke("text");
  });
});
