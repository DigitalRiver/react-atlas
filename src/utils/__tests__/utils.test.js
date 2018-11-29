import utils from "../../utils/utils";
import React from "react";

describe("Testing utilities", () => {
  it("Test angle360FromPositions() returns angle", function() {
    expect(typeof utils.angle360FromPositions).toBe("function");
    expect(utils.angle360FromPositions(0, 3, 0, 3)).toBe(90);
    expect(utils.angle360FromPositions(0, 2, 0, -2)).toBe(0);
    expect(utils.angle360FromPositions(0, 3, -3, 0)).toBe(315);
  });

  it("Test range() returns range", function() {
    expect(typeof utils.range).toBe("function");
    expect(utils.range(0, 10, 1)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(utils.range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
    expect(utils.range(1, 5)).toEqual([1, 2, 3, 4]);
    expect(utils.range(4)).toEqual([0, 1, 2, 3]);
    expect(utils.range()).toEqual([]);
  });

  it("Test round() correctly rounds up", function() {
    expect(typeof utils.round).toBe("function");
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

  it("Test getViewport() returns an object with height and width", function() {
    expect(typeof utils.getViewport).toBe("function");
    expect(typeof utils.getViewport()).toBe("object");
    expect(utils.getViewport().hasOwnProperty("height")).toBe(true);
    expect(utils.getViewport().hasOwnProperty("width")).toBe(true);
    expect(utils.getViewport().height).toEqual(
      window.innerHeight || document.documentElement.offsetHeight
    );
    expect(utils.getViewport().width).toEqual(
      window.innerWidth || document.documentElement.offsetWidth
    );
    window.innerHeight = null;
    window.innerWidth = null;
    expect(utils.getViewport().width).toEqual(
      document.documentElement.offsetWidth
    );
    expect(utils.getViewport().height).toEqual(
      document.documentElement.offsetHeight
    );
  });

  it("Test inputTypeForPrototype() returns input type for prototype", function() {
    expect(typeof utils.inputTypeForPrototype).toBe("function");
    expect(utils.inputTypeForPrototype(Date)).toBe("date");
    expect(utils.inputTypeForPrototype(Boolean)).toBe("checkbox");
    expect(utils.inputTypeForPrototype(Number)).toBe("number");
    expect(utils.inputTypeForPrototype(String)).toBe("text");
  });

  it("Test prepareValueForInput() returns prepared value for input", function() {
    expect(typeof utils.prepareValueForInput).toBe("function");
    expect(utils.prepareValueForInput("12/31/18", "date")).toBe("2018-12-31");
    expect(utils.prepareValueForInput("checked", "checkbox")).toBe("on");
    let nullCheckbox = utils.prepareValueForInput(undefined, "checkbox"); //eslint-disable-line no-undefined
    expect(nullCheckbox).toEqual(null);
    expect(utils.prepareValueForInput("foo")).toBe("foo");
  });

  it("Test getSelection", function() {
    expect(typeof utils.getSelection).toBe("function");
    document.body.innerHTML = `<input id="myInput" type="text"/>`;
    const myInput = document.getElementById("myInput");
    const inputSelection = { "start": 0, "end": 2 };

    expect(utils.getSelection(myInput)).toEqual({ "start": 0, "end": 0 });
    myInput.value = "foo";
    expect(utils.getSelection(myInput)).toEqual({ "start": 0, "end": 0 });

    myInput.selectionStart = -1;
    expect(utils.getSelection(myInput)).toEqual({ "start": 3, "end": 3 });

    utils.setSelection(myInput, inputSelection);
    expect(utils.getSelection(myInput)).toEqual({ "start": 0, "end": 2 });
  });

  it("Test cloneObject() returns a cloned object", function() {
    let myObject = {
      "foo": "foo",
      "bar": "bar"
    };

    expect(typeof utils.cloneObject).toBe("function");
    expect(typeof utils.cloneObject(myObject)).toBe("object");
    expect(utils.cloneObject(myObject)).toEqual(myObject);
  });

  it("getRequiredText creates span with required text", function() {
    expect(typeof utils.getRequiredText).toBe("function");
    let reqText = "foo";
    expect(utils.getRequiredText(reqText)).toEqual(
      <span styleName="error_text">foo</span>
    );
  });

  it("getErrorMessage creates div with error message text", function() {
    expect(typeof utils.getErrorMessage).toBe("function");
    let error = "foo";
    expect(utils.getErrorMessage(error)).toEqual(
      <div styleName="error_message">foo</div>
    );
  });

  it("Test getCompName()", function() {
    expect(typeof utils.getComponentName).toBe("function");
    let comp = { "type": { "displayName": "Input" } };
    expect(utils.getComponentName(comp)).toBe("Input");

    let comp2 = { "type": { "displayName": undefined, "name": "Input2" } }; //eslint-disable-line no-undefined
    expect(utils.getComponentName(comp2)).toBe("Input2");

    let comp3 = { "type": "Input3" };
    expect(utils.getComponentName(comp3)).toBe("Input3");

    let comp4 = {};
    expect(utils.getComponentName(comp4)).toBe(null);

    let comp5 = { "type": {} };
    expect(utils.getComponentName(comp5)).toBe(null);
  });

  it("Test filter()", function() {
    expect(typeof utils.filter).toBe("function");
    const myObject = {
      "foo": "foo",
      "bar": "bar",
      "foobar": "foobar"
    };

    let excludes = {
      "foo": "foo",
      "bar": "bar"
    };

    expect(utils.filter(myObject, excludes)).toEqual({ "foobar": "foobar" });
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
    expect(typeof utils.validate).toBe("function");
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
  it("Test _getValidationObject() validator is not a function", function() {
    const validationObject = utils.validate("5", null, status, message, false);
    expect(validationObject.status).toBe(null);
    expect(validationObject.message).toBe(null);
  });
  it("Test _getValidationObject() validator is not a function and input is empty and required", function() {
    const validationObject = utils.validate("", null, status, message, true);
    expect(validationObject.status).toBe("error");
    expect(validationObject.message).toBe("This field is required");

    const validationObject2 = utils.validate("", null, status, message, "true");
    expect(validationObject2.status).toBe("error");
    expect(validationObject2.message).toBe("This field is required");

    const validationObject3 = utils.validate("", null, status, message, "");
    expect(validationObject3.status).toBe("error");
    expect(validationObject3.message).toBe("This field is required");
  });
});
