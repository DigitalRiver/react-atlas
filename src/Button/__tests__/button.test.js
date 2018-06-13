import React from "react";
import { mount } from "enzyme";
import { Button } from "../index";

import { verifyPropsDefaultValue } from "../../utils/propsVerification.js";

import renderer from "react-test-renderer";

let icon = "fa fa-github";

describe("Test Button render", () => {
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

describe("Test Button component: Basic Tests", () => {
  let result = mount(<Button />);
  it("Test default props", function() {
    expect(result.props().children).toBe("Default Button");
    expect(result.props().outline).toBe(false);
  });

  it("Main style is set to default.", function() {
    expect(result.props().primary).toBe(false);
    expect(result.props().children).toBe("Default Button");
  });

  it("Main style is set to primary.", function() {
    result = mount(<Button primary />);
    expect(result.props().primary).toBe(true);
  });

  it("Main style is set to secondary.", function() {
    result = mount(<Button secondary />);
    expect(result.props().secondary).toBe(true);
  });

  it("Main style is set to success.", function() {
    result = mount(<Button success />);
    expect(result.props().success).toBe(true);
  });

  it("Main style is set to warning.", function() {
    result = mount(<Button warning />);
    expect(result.props().warning).toBe(true);
  });

  it("Main style is set to danger.", function() {
    result = mount(<Button danger />);
    expect(result.props().danger).toBe(true);
  });

  it("Main style is set to link.", function() {
    result = mount(<Button link />);
    expect(result.props().link).toBe(true);
  });

  it("Size is set to large.", function() {
    result = mount(<Button large />);
    expect(result.props().large).toBe(true);
    expect(result.props().small).toBe(false);
  });

  it("Size is set to small.", function() {
    result = mount(<Button small />);
    expect(result.props().small).toBe(true);
    expect(result.props().large).toBe(false);
  });

  it("Icon is set on button.", function() {
    result = mount(<Button icon={icon} />);
    expect(result.props().icon).toEqual(icon);
  });

  it("Button has an ID prop.", function() {
    result = mount(<Button id={"ID"} />);
    expect(result.props().id).toBe("ID");
  });

  it("Button has an NAME prop.", function() {
    result = mount(<Button name={"NAME"} />);
    expect(result.props().name).toBe("NAME");
  });

  it("Icon is set on button with text.", function() {
    result = mount(<Button icon={icon}>Icon</Button>);
    expect(result.props().icon).toEqual(icon);
    expect(result.props().children).toBe("Icon");
  });

  it("Main style is set to Primary with Outline.", function() {
    result = mount(<Button primary outline />);
    expect(result.props().primary).toBe(true);
    expect(result.props().outline).toBe(true);
  });

  it("Button has an IgnoreTab prop.", function() {
    result = mount(<Button IgnoreTab />);
    expect(result.props().IgnoreTab).toBe(true);
  });

  it("Disabled Button test", function() {
    result = mount(<Button disabled />);
    expect(result.props().disabled).toBe(true);
  });

  it("Button href test", function() {
    result = mount(
      <Button link href="http://www.github.com">
        Link
      </Button>
    );
    expect(result.props().link).toBe(true);
    expect(result.props().href).toEqual("http://www.github.com");
  });

  it("Button default properties", function() {
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

  it("Button custom properties", function() {
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
