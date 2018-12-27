import React from "react";
import { mount } from "enzyme";
import { Checkbox } from "../index";

import { verifyPropsDefaultValue } from "../../utils/propsVerification";

import renderer from "react-test-renderer";

describe("Test checkbox component", () => {
  it("Test default props", function() {
    const result = mount(<Checkbox />);
    expect(result.props().className).toBe("");
    expect(result.props().disabled).toBe(false);
    expect(result.props().inline).toBe(false);
    expect(
      result
        .find("input")
        .props()
        .onChange()
    ).toBe(false);
    expect(result.find(".float_left").exists()).toBe(true);
  });

  it("Make sure label is used as title when title is not set", function() {
    const result = mount(<Checkbox label={"labelText"} />);
    expect(result.text()).toContain("labelText");
  });

  it("renders correctly", () => {
    const tree = renderer.create(<Checkbox label={"labelText"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("get status returns null if prestate is true, required and not checked", () => {
    const prestate = true;
    const cb = mount(<Checkbox label={"labelText"} required />);
    expect(cb.instance()._getStatus(prestate)).toBe(null);
  });

  it("get status returns null if prestate is true, not required", () => {
    const prestate = true;
    const cb = mount(<Checkbox label={"labelText"} />);
    expect(cb.instance()._getStatus(prestate)).toBe(null);
  });

  it("get status returns error if prestate is false, required", () => {
    const prestate = false;
    const cb = mount(<Checkbox label={"labelText"} required />);
    expect(cb.instance()._getStatus(prestate)).toBe("error");
  });
});

describe("Test checkbox component - Default values", () => {
  it("Test checkbox component - Custom values", function() {
    const component = mount(
      <Checkbox
        defaultChecked
        title="Adrian rules!!"
        label="Disabled checkbox"
      />
    );

    const expProps = new Map([
      ["label", "Disabled checkbox"],
      ["className", ""],
      ["disabled", false],
      ["inline", false],
      ["title", "Adrian rules!!"]
    ]);
    expect(verifyPropsDefaultValue(component, expProps)).toEqual(true);
  });

  it("Test default props", function() {
    const component = mount(<Checkbox />);

    const expProps = new Map([
      ["className", ""],
      ["disabled", false],
      ["inline", false]
    ]);
    expect(verifyPropsDefaultValue(component, expProps)).toEqual(true);
  });

  it("Test checkbox component - Click event", function() {
    const comp = mount(<Checkbox />);
    expect(comp.state().checked).toEqual(false);
    comp.simulate("click");
    expect(comp.state().checked).toEqual(true);
  });

  it("Test checkbox component (disabled) - Click event", function() {
    const comp = mount(<Checkbox disabled />);
    expect(comp.state().checked).toEqual(false);
    comp.simulate("click");
    expect(comp.state().checked).toEqual(false);
  });

  it("Test checkbox component - Click event with bocus event first", function() {
    const comp = mount(<Checkbox />);
    expect(comp.state().checked).toEqual(false);
    comp.simulate("focus");
    comp.simulate("click");
    expect(comp.state().checked).toEqual(true);
  });

  it("Test checkbox component - Click event with blur event first", function() {
    const comp = mount(<Checkbox />);
    expect(comp.state().checked).toEqual(false);
    comp.simulate("blur");
    comp.simulate("click");
    expect(comp.state().checked).toEqual(true);
  });

  it("Test checkbox component - Event two Clicks", function() {
    const comp = mount(<Checkbox />);
    expect(comp.state().checked).toEqual(false);
    comp.simulate("click");
    comp.simulate("click");
    expect(comp.state().checked).toEqual(false);
  });

  it("Test checkbox component - Click event (custom onClick callback)", function() {
    const handleClick = jest.fn();
    const comp = mount(<Checkbox onClick={handleClick} />);
    expect(comp.state().checked).toEqual(false);
    comp.simulate("click");
    expect(comp.state().checked).toEqual(true);
    expect(handleClick).toBeCalled();
  });

  it("Test checkbox component - Click event (custom onChange callback)", function() {
    const handleChange = jest.fn();
    const comp = mount(<Checkbox onChange={handleChange} />);
    expect(comp.state().checked).toEqual(false);
    comp.simulate("click");
    expect(comp.state().checked).toEqual(true);
    expect(handleChange).toBeCalled();
  });

  it("Test checkbox component - Click event (custom onBeforeChange returns false)", function() {
    const comp = mount(
      <Checkbox
        onBeforeChange={function() {
          return false;
        }}
      />
    );
    expect(comp.state().checked).toEqual(false);
    comp.simulate("click");
    expect(comp.state().checked).toEqual(false);
  });

  it("Test checkbox component - Click event (custom onBeforeChange returns true)", function() {
    const comp = mount(
      <Checkbox
        onBeforeChange={function() {
          return true;
        }}
      />
    );
    expect(comp.state().checked).toEqual(false);
    comp.simulate("click");
    expect(comp.state().checked).toEqual(true);
  });

  it("Test checkbox component - labelPosition left", function() {
    const comp = mount(<Checkbox labelPosition="left" />);
    expect(comp.find(".float_right").exists()).toBe(true);
  });

  it("Test checkbox component - required text", function() {
    const comp = mount(
      <Checkbox labelPosition="left" required="you must check this box" />
    );
    expect(comp.find(".required").html()).toContain("you must check this box");
  });
});
describe("Test checkbox component - update from props", () => {
  it("update checked prop", function() {
    const component = mount(<Checkbox label="Checkbox" />);
    expect(component.state().checked).toEqual(false);
    component.setProps({ checked: true });
    expect(component.state().checked).toEqual(true);
    component.setProps({ checked: false });
    expect(component.state().checked).toEqual(false);
  });
});
