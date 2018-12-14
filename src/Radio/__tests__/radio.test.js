import React from "react";
import { mount } from "enzyme";
import { Radio } from "../index";

import renderer from "react-test-renderer";

describe("Test Radio component render", () => {
  it("Render correctly", () => {
    const tree = renderer
      .create(
        <Radio
          label={"Checked Radio"}
          value={"checkedRadio"}
          defaultChecked
          className={"class"}
          title={"TITLE"}
          hidden={false}
          inline
          name={"Mr radio"}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing radio component", () => {
  it("Radio - Default checked test", function() {
    const rad = mount(
      <Radio
        checked
        label="Checked Radio"
        value="checkedRadio"
        groupSetChecked={function() {}}
      />
    );
    expect(rad.props().checked).toEqual(true);
  });

  it("Radio - Simple click test", function() {
    const handleClick = jest.fn();
    const rad = mount(
      <Radio
        label="Checked Radio"
        value="checkedRadio"
        groupSetChecked={function() {}}
        onClick={handleClick}
      />
    );
    rad.simulate("click");
    expect(handleClick).toBeCalled();
  });

  it("Radio - Simple click test (disabled)", function() {
    const handleClick = jest.fn();
    const rad = mount(
      <Radio
        disabled
        label="Checked Radio"
        value="checkedRadio"
        onClick={handleClick}
        groupSetChecked={function() {}}
      />
    );
    rad.simulate("click");
    expect(handleClick).not.toBeCalled();
  });

  it("Radio - Simple click test (with onBeforeChange)", function() {
    const handleBeforeChange = jest.fn();
    const rad = mount(
      <Radio
        label="Checked Radio"
        value="checkedRadio"
        groupSetChecked={function() {}}
        onBeforeChange={handleBeforeChange}
      />
    );
    rad.simulate("click");
    expect(handleBeforeChange).toBeCalled();
  });

  it("Radio - labelPosition left", function() {
    const rad = mount(
      <Radio
        checked
        label="Checked Radio"
        labelPosition="left"
        value="checkedRadio"
      />
    );
    expect(rad.find(".float_right").exists()).toBe(true);
  });

  it("Radio - labelPosition default", function() {
    const rad = mount(
      <Radio checked label="Checked Radio" value="checkedRadio" />
    );
    expect(rad.find(".float_left").exists()).toBe(true);
  });

  it("Radio - input onChange returns false", function() {
    const handleChange = jest.fn();
    const handleClick = jest.fn();
    const rad = mount(
      <Radio
        checked
        label="Checked Radio"
        value="checkedRadio"
        groupSetChecked={function() {}}
        onClick={handleClick}
        onChange={handleChange}
      />
    );
    expect(
      rad
        .find("input")
        .props()
        .onChange()
    ).toBe(false);
  });

  it("Radio - CWRP calls onChange if new props checked does not equal old props and onChange exists", function() {
    const handleChange = jest.fn();
    const handleClick = jest.fn();
    const rad = mount(
      <Radio
        checked
        label="Checked Radio"
        value="checkedRadio"
        groupSetChecked={function() {}}
        onClick={handleClick}
        onChange={handleChange}
      />
    );
    expect(rad.props().checked).toBe(true);
    rad.setProps({ checked: false });
    expect(handleChange).toBeCalled();
  });
});
