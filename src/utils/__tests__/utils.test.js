import utils from "../../utils/utils";

describe("Testing utilities", () => {
  it("Test getCompName()", function() {
    // expect(utils).not.toBe(undefined); Commented out due to linting error

    let comp = { "type": { "displayName": "Input" } };
    expect(utils.getComponentName(comp)).toBe("Input");

    /**
     * Commented out due to linting error
     * let comp2 = { "type": { "displayName": undefined, "name": "Input2" } };
     * expect(utils.getComponentName(comp2)).toBe("Input2");
     */

    let comp3 = { "type": "Input3" };
    expect(utils.getComponentName(comp3)).toBe("Input3");

    let comp4 = {};
    expect(utils.getComponentName(comp4)).toBe(null);

    let comp5 = { "type": {} };
    expect(utils.getComponentName(comp5)).toBe(null);
  });
});

describe("Test Dropdown component - _getValidationObject() method", () => {
  const validator = value => {
    if (value === "0") {
      return true;
    } else if (value === "1") {
      return { "status": "warning", "message": "Warning" };
    } else if (value === "2") {
      return { "status": "success", "message": "Success" };
    } else if (value === "3") {
      return { "status": "error", "message": "Error" };
    } else if (value === "4") {
      return false;
    } else if (value === "5") {
      return { "status": null, "message": null };
    }
  };
  const status = "success";
  const message = "Success";
  it("Test _getValidationObject() true", function() {
    const validationObject = utils.validate(
      "0",
      validator,
      status,
      message,
      false
    );
    expect(validationObject.status).toBe("success");
    expect(validationObject.message).toBe("Success");
  });
  it("Test _getValidationObject() warning", function() {
    const validationObject = utils.validate(
      "1",
      validator,
      status,
      message,
      false
    );
    expect(validationObject.status).toBe("warning");
    expect(validationObject.message).toBe("Warning");
  });
  it("Test _getValidationObject() success", function() {
    const validationObject = utils.validate(
      "2",
      validator,
      status,
      message,
      false
    );
    expect(validationObject.status).toBe("success");
    expect(validationObject.message).toBe("Success");
  });
  it("Test _getValidationObject() error", function() {
    const validationObject = utils.validate(
      "3",
      validator,
      status,
      message,
      false
    );
    expect(validationObject.status).toBe("error");
    expect(validationObject.message).toBe("Error");
  });
  it("Test _getValidationObject() false", function() {
    const validationObject = utils.validate(
      "4",
      validator,
      status,
      message,
      false
    );
    expect(validationObject.status).toBe("error");
    expect(validationObject.message).toBe(null);
  });
  it("Test _getValidationObject() null", function() {
    const validationObject = utils.validate(
      "5",
      validator,
      status,
      message,
      false
    );
    expect(validationObject.status).toBe(null);
    expect(validationObject.message).toBe(null);
  });
});
