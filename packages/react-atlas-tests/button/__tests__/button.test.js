import React from "react";
import { mount } from "enzyme";
import { default as Button } from "../../../react-atlas-core/src/Button/Button";

import { verifyPropsDefaultValue } from "../../utils/propsVerification";

describe("Test ButtonCore component", () => {
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

  describe("Test Button component", () => {
    it("Base case - Primary Button", function() {
      const comp = mount(<Button primary />);
    });

    it("Base case - Secondary Button", function() {
      const comp = mount(<Button secondary />);
    });

    it("Base case - Warning Button", function() {
      const comp = mount(<Button warning />);
    });

    it("Base case - Error Button", function() {
      const comp = mount(<Button error />);
    });

    it("Base case - Link Button", function() {
      const comp = mount(<Button link />);
    });

    it("Base case - Button with icon", function() {
      const comp = mount(<Button icon={"FakeIcon"} />);
    });

    it("Base case - Button with icon 2", function() {
      const comp = mount(
        <Button icon={"FakeIcon"} children={"FakeChildren"} />
      );
    });

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
      const comp = mount(
        <Button secondary={true} warning={true} large={true} disabled={true} />
      );
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
      const comp = mount(
        <Button
          onClick={function() {
            buttonWasClicked = true;
          }}
        />
      );

      let buttonWasClicked = false;

      comp.simulate("click");

      expect(buttonWasClicked).toEqual(true);
    });
  });
});
