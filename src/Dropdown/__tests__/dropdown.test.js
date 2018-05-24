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
});

describe("Test Dropdown component - Dropdown Regression tests", () => {
  it("Test preset status with children", function() {
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
