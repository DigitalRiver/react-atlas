import React from "react";
import { mount } from "enzyme";
import { Button } from "../../Button/index";
import { verifyPropsDefaultValue } from "../propsVerification";

describe("Testing propsVerification", () => {
  it("Test verifyPropsDefaultValue() returns true when props are correct", function() {
    const comp = mount(<Button />);
    const expected = new Map([
      ["children", "Default Button"],
      ["outline", false],
      ["primary", false],
      ["secondary", false],
      ["warning", false],
      ["error", false],
      ["link", false],
      ["large", false],
      ["small", false],
      ["disabled", false]
    ]);
    expect(verifyPropsDefaultValue(comp, expected)).toEqual(true);
  });

  it("Test verifyPropsDefaultValue() returns false when props are incorrect", function() {
    const comp = mount(<Button />);
    const expected = new Map([
      ["children", "Default Button"],
      ["outline", true],
      ["primary", true],
      ["secondary", true],
      ["warning", true],
      ["error", true],
      ["link", true],
      ["large", true],
      ["small", true],
      ["disabled", true]
    ]);
    expect(verifyPropsDefaultValue(comp, expected)).toEqual(false);
  });
});
