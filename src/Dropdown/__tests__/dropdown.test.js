import React from "react";
import { mount, shallow } from "enzyme";
import { Dropdown } from "../index";
import { Option } from "../../Option/index";
import renderer from "react-test-renderer";

describe("Test dropdown component", () => {
  it("Test render correctly", () => {
    const comp = 
      <Dropdown onChange={function() {}}>
        <Option text="May" value="" />
        <Option value="the" text="the" />
        <Option value="force" text="force" />
        <Option value="be" text="be" />
        <Option value="with" text="with" />
        <Option value="you" text="you" />
      </Dropdown>
    ;
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test Dropdown component - Basic tests", () => {
  const childrenComp = shallow(
    <Dropdown>
      <Option text="May" value="" />
      <Option value="the" text="the" />
      <Option value="force" text="force" />
      <Option value="be" text="be" />
      <Option value="with" text="with" />
      <Option value="you" text="you" />
    </Dropdown>
  );

  const optionsComp = mount(
    <Dropdown
      options={[{ "text": "Yes", "value": "true" }, { "text": "No", "value": "false" }]}
    />
  );

  it("Test Dropdown renders properly", () => {
    expect(childrenComp.exists(<Dropdown />)).toBe(true);
  });

  it("Children render properly", () => {
    expect(childrenComp.find(Option).length).toEqual(6);
  });

  it("Options render properly", () => {
    expect(optionsComp.find(Option).length).toEqual(2);
  });

  it("Test Dropdown component - Basic test", function() {
    const component = shallow(
      <Dropdown value="be" label="Label">
        <Option text="May" value="" />
        <Option value="the" text="the" />
        <Option value="force" text="force" />
        <Option value="be" text="be" />
        <Option value="with" text="with" />
        <Option value="you" text="you" />
      </Dropdown>
    );
    expect(component.state().value).toEqual("be");
    expect(component.state().display).toEqual("be");
  });

  it("Test preset status", function() {
    const component = mount(
      <Dropdown status="error">
        <Option value="May" text="May" />
        <Option value="the" text="the" />
        <Option value="force" text="force" />
        <Option value="be" text="be" />
        <Option value="with" text="with" />
        <Option value="you" text="you" />
      </Dropdown>
    );
    expect(component.state().status).toEqual("error");
  });
});

describe("Test Dropdown component - setOptions() method", () => {
  const component = mount(
    <Dropdown
      name="dataDropdown"
      id="dataDropdown"
      options={[{ "text": "Yes", "value": "true" }, { "text": "No", "value": "false" }]}
    />
  );
  const instance = component.instance();
  it("Test _alwaysTrue()", function() {
    expect(instance._alwaysTrue()).toBe(true);
  });
  it("Test initial setOptions() call", function() {
    const returnObject = instance.setOptions({}, component.props());
    expect(returnObject.options.length).toBe(2);
    expect(returnObject.display).toBe("");
    expect(returnObject.value).toBe("");
    expect(returnObject.selectedIndex).toBe(null);
    expect(returnObject.options[0].props.selected).toBe(false);
    expect(returnObject.options[1].props.selected).toBe(false);
    expect(returnObject.options[0].props.hover).toBe(false);
    expect(returnObject.options[1].props.hover).toBe(false);
  });
  it("Test cwrp setOptions() call", function() {
    const nextProps = {
      "value": "horse",
      "name": "dataDropdown",
      "id": "dataDropdown",
      "options": [
        { "text": "Cow", "value": "cow" },
        { "text": "Horse", "value": "horse" }
      ],
      "tooltipPosition": "right"
    };
    const returnObject = instance.setOptions({}, nextProps, false, true);
    expect(returnObject.options.length).toBe(2);
    expect(returnObject.display).toBe("Horse");
    expect(returnObject.value).toBe("horse");
    expect(returnObject.selectedIndex).toBe(1);
    expect(returnObject.options[0].props.selected).toBe(false);
    expect(returnObject.options[1].props.selected).toBe(true);
    expect(returnObject.options[0].props.hover).toBe(false);
    expect(returnObject.options[1].props.hover).toBe(false);
  });
  it("Test optionOnClick setOptions() call", function() {
    const updatedValues = { "tempIndex": null, "selectedIndex": 1, "value": "false" };
    const returnObject = instance.setOptions(updatedValues, component.props());
    expect(returnObject.options.length).toBe(2);
    expect(returnObject.display).toBe("No");
    expect(returnObject.value).toBe("false");
    expect(returnObject.selectedIndex).toBe(1);
    expect(returnObject.options[0].props.selected).toBe(false);
    expect(returnObject.options[1].props.selected).toBe(true);
    expect(returnObject.options[0].props.hover).toBe(false);
    expect(returnObject.options[1].props.hover).toBe(false);
  });
  it("Test optionOnMouseOver & _handleKeyDown (active: true) setOptions() call", function() {
    const updatedValues = { "tempIndex": 0 };
    const returnObject = instance.setOptions(
      updatedValues,
      component.props(),
      false,
      false,
      true
    );
    expect(returnObject.options.length).toBe(2);
    expect(returnObject.display).toBe("");
    expect(returnObject.value).toBe("");
    expect(returnObject.selectedIndex).toBe(null);
    expect(returnObject.options[0].props.selected).toBe(false);
    expect(returnObject.options[1].props.selected).toBe(false);
    expect(returnObject.options[0].props.hover).toBe(true);
    expect(returnObject.options[1].props.hover).toBe(false);
  });
  it("Test _handleChange setOptions() call", function() {
    const updatedValues = { "selectedIndex": null, "display": "No" };
    const returnObject = instance.setOptions(
      updatedValues,
      component.props(),
      true
    );
    expect(returnObject.options.length).toBe(1);
    expect(returnObject.display).toBe("No");
    expect(returnObject.value).toBe("false");
    expect(returnObject.selectedIndex).toBe(0);
    expect(returnObject.options[0].props.selected).toBe(true);
    expect(returnObject.options[0].props.hover).toBe(false);
  });
  it("Test _handleKeyDown (active: false) setOptions() call", function() {
    const updatedValues = { "selectedIndex": 0 };
    const returnObject = instance.setOptions(
      updatedValues,
      component.props(),
      false,
      false,
      true
    );
    expect(returnObject.options.length).toBe(2);
    expect(returnObject.display).toBe("Yes");
    expect(returnObject.value).toBe("true");
    expect(returnObject.selectedIndex).toBe(0);
    expect(returnObject.options[0].props.selected).toBe(true);
    expect(returnObject.options[1].props.selected).toBe(false);
    expect(returnObject.options[0].props.hover).toBe(false);
    expect(returnObject.options[1].props.hover).toBe(false);
  });
});
