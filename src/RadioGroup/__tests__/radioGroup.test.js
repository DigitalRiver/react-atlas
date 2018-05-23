import React from "react";
import { mount } from "enzyme";
import Radio from "../../Radio/index";
import RadioGroup from "../index";

import renderer from "react-test-renderer";

describe("Test RadioGroup component render", () => {
  it("Render correctly", () => {
    const tree = renderer
      .create(
        <RadioGroup inline name="test">
          <Radio label="Option 1" value="first" />
          <Radio label="Option 2" value="second" />
          <Radio label="Option 3" value="third" />
          <Radio label="Option 4" value="fourth" />
          <Radio label="Option 5" value="fifth" />
          <Radio label="Option 6" value="sixth" />
        </RadioGroup>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing radio component", () => {
  it("RadioGroup - Basic test", function() {
    mount(
      <RadioGroup inline name="test" title="Title" classname="Class">
        <Radio label="Option 1" value="first" />
        <Radio label="Option 2" value="second" />
      </RadioGroup>
    );
  });

  it("RadioGroup - Change selection test", function() {
    const result = mount(
      <RadioGroup inline name="test">
        <Radio label="Option 1" value="first" />
        <Radio label="Option 2" value="second" />
        <Radio label="Option 3" value="third" />
        <Radio label="Option 4" value="fourth" />
        <Radio label="Option 5" value="fifth" />
        <Radio label="Option 6" value="sixth" />
      </RadioGroup>
    );
    expect(result.state().checkedRadio).toEqual(0);

    result
      .find(Radio)
      .last()
      .simulate("click");
    expect(result.state().checkedRadio).toEqual(5);

    result
      .find(Radio)
      .first()
      .simulate("click");
    expect(result.state().checkedRadio).toEqual(0);
  });

  it("RadioGroup - Change props ", function() {
    const result = mount(
      <RadioGroup inline name="test">
        <Radio label="Option 1" value="first" />
        <Radio label="Option 2" value="second" />
        <Radio label="Option 3" value="third" />
        <Radio label="Option 4" value="fourth" />
        <Radio label="Option 5" value="fifth" />
        <Radio label="Option 6" value="sixth" />
      </RadioGroup>
    );
    result.setProps({ "name": "Name" });

    result
      .find(Radio)
      .last()
      .simulate("click");
    expect(result.state().checkedRadio).toEqual(5);

    result.setProps({ "selectedIndex": 1 });
    expect(result.state().checkedRadio).toEqual(1);
  });
});
