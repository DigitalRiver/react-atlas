import React from "react";
import { mount } from "enzyme";
import Button from "../index";

import { verifyPropsDefaultValue } from "../../utils/propsVerification.js";

import renderer from "react-test-renderer";

describe("Test correct render", () => {
  it("Test correct render", function() {
    const tree = renderer
      .create(
        <Button
          href={"http://www.google.com.are"}
          className={"aClass"}
          style={"Style"}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test Button component", () => {
  it("Test default props", function() {
    const result = mount(<Button />);
    expect(result.props().children).toBe("Default Button");
    expect(result.props().outline).toBe(false);
  });

  it("Make sure main style is set correctly.", function() {
    let result = mount(<Button />);
    expect(result.props().primary).toBe(false);

    result = mount(<Button primary />);
    expect(result.props().primary).toBe(true);

    result = mount(<Button secondary />);
    expect(result.props().secondary).toBe(true);

    result = mount(<Button success />);
    expect(result.props().success).toBe(true);

    result = mount(<Button warning />);
    expect(result.props().warning).toBe(true);

    result = mount(<Button danger />);
    expect(result.props().danger).toBe(true);

    result = mount(<Button link />);
    expect(result.props().link).toBe(true);
  });
});

describe("Test Button component", () => {
  it("Base case - Button default properties", function() {
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

  it("Base case - Button custom properties", function() {
    const comp = mount(<Button secondary warning large disabled />);
    const expected = new Map([
      ["children", "Default Button"],
      ["outline", false],
      ["primary", false],
      ["secondary", true],
      ["warning", true],
      ["error", false],
      ["link", false],
      ["large", true],
      ["small", false],
      ["disabled", true]
    ]);
    expect(verifyPropsDefaultValue(comp, expected)).toEqual(true);
  });

  it("Click Button test", function() {
    let buttonWasClicked = false;

    const comp = mount(
      <Button
        onClick={function() {
          buttonWasClicked = true;
        }}
      />
    );

    comp.simulate("click");

    expect(buttonWasClicked).toEqual(true);
  });
});
