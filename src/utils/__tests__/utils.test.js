import utils from "../../utils/utils";
import React from "react";

describe("Testing utilities", () => {
  it("Test round() correctly rounds up", function() {
    expect(utils.round(2.55555, 0)).toBe(3);
    expect(utils.round(2.55555, 1)).toBe(2.6);
    expect(utils.round(2.55555, 2)).toBe(2.56);
    expect(utils.round(2.55555, 3)).toBe(2.556);
  });

  it("Test round() correctly rounds down", function() {
    expect(utils.round(2.11111, 0)).toBe(2);
    expect(utils.round(2.11111, 1)).toBe(2.1);
    expect(utils.round(2.11111, 2)).toBe(2.11);
    expect(utils.round(2.11111, 3)).toBe(2.111);
  });

  it("Test round() returns NaN if not given a number", function() {
    expect(utils.round("foo", 0)).toBe(NaN);
  });

  it("Test getViewport() returns an object", function() {
    expect(typeof utils.getViewport()).toBe("object");
    expect(utils.getViewport().hasOwnProperty("height")).toBe(true);
    expect(utils.getViewport().hasOwnProperty("width")).toBe(true);
    expect(utils.getViewport().height).toEqual(
      window.innerHeight || document.documentElement.offsetHeight
    );
    expect(utils.getViewport().width).toEqual(
      window.innerWidth || document.documentElement.offsetWidth
    );
  });

  it("Test cloneObject() returns a cloned object", function() {
    let myObject = {
      "foo": "foo",
      "bar": "bar"
    };

    expect(typeof utils.cloneObject(myObject)).toBe("object");
    expect(utils.cloneObject(myObject)).toEqual(myObject);
  });

  it("getRequiredText creates span with required text", function() {
    let reqText = "foo";
    expect(utils.getRequiredText(reqText)).toEqual(
      <span styleName="error_text">foo</span>
    );
  });

  it("getErrorMessage creates div with error message text", function() {
    let error = "foo";
    expect(utils.getErrorMessage(error)).toEqual(
      <div styleName="error_message">foo</div>
    );
  });

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

describe("Test utils.validate() method", () => {
  const validator = (event, value) => {
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
