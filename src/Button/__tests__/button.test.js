import React from "react";
import { mount } from "enzyme";
import { ButtonCore } from "../../../react-atlas-core/src/Button/index";

import { verifyPropsDefaultValue } from "../../utils/propsVerification";

import renderer from "react-test-renderer";

describe("Test correct render", () => {
  it("Test correct render", function() {
    const tree = renderer
      .create(
        <ButtonCore
          href={"http://www.google.com.are"}
          className={"aClass"}
          style={"Style"}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test ButtonCore component", () => {
  it("Test default props", function() {
    const result = mount(<ButtonCore />);
    expect(result.props().children).toBe("Default Button");
    expect(result.props().outline).toBe(false);
  });

  it("Make sure main style is set correctly.", function() {
    let result = mount(<ButtonCore />);
    expect(result.props().primary).toBe(false);

    result = mount(<ButtonCore primary />);
    expect(result.props().primary).toBe(true);

    result = mount(<ButtonCore secondary />);
    expect(result.props().secondary).toBe(true);

    result = mount(<ButtonCore success />);
    expect(result.props().success).toBe(true);

    result = mount(<ButtonCore warning />);
    expect(result.props().warning).toBe(true);

    result = mount(<ButtonCore danger />);
    expect(result.props().danger).toBe(true);

    result = mount(<ButtonCore link />);
    expect(result.props().link).toBe(true);
  });
});

describe("Test Button component", () => {
  it("Base case - Button default properties", function() {
    const comp = mount(<ButtonCore />);
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
    const comp = mount(<ButtonCore secondary warning large disabled />);
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
      <ButtonCore
        onClick={function() {
          buttonWasClicked = true;
        }}
      />
    );

    comp.simulate("click");

    expect(buttonWasClicked).toEqual(true);
  });
});
