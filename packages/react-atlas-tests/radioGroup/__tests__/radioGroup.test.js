import React from "react";
import { mount } from "enzyme";
import { RadioCore } from "../../../react-atlas-core/src/Radio/index";
import { RadioGroupCore } from "../../../react-atlas-core/src/RadioGroup/index";

import renderer from 'react-test-renderer';

describe("Test RadioGroup component render", () => {
	it('Render correctly', () => {
    const tree = renderer.create(
			<RadioGroupCore inline name="test">
        <RadioCore label="Option 1" value="first" />
        <RadioCore label="Option 2" value="second" />
        <RadioCore label="Option 3" value="third" />
        <RadioCore label="Option 4" value="fourth" />
        <RadioCore label="Option 5" value="fifth" />
        <RadioCore label="Option 6" value="sixth" />
      </RadioGroupCore>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing radio component", () => {
  function _findRadio(node, label) {
    return (
      node.props().type == "radio" &&
      node.props().checked != undefined &&
      node.props().label == label
    );
  }
	
  it("RadioGroup - Basic test", function() {
    const result = mount(
      <RadioGroupCore inline name="test" title="Title" classname="Class">
        <RadioCore label="Option 1" value="first" />
        <RadioCore label="Option 2" value="second" />
      </RadioGroupCore>
    );
  });

  it("RadioGroup - Change selection test", function() {
    const result = mount(
      <RadioGroupCore inline name="test">
        <RadioCore label="Option 1" value="first" />
        <RadioCore label="Option 2" value="second" />
        <RadioCore label="Option 3" value="third" />
        <RadioCore label="Option 4" value="fourth" />
        <RadioCore label="Option 5" value="fifth" />
        <RadioCore label="Option 6" value="sixth" />
      </RadioGroupCore>
    );
    expect(result.state().checkedRadio).toEqual("first");

    result.findWhere(n => _findRadio(n, "Option 4")).simulate("click");
    expect(result.state().checkedRadio).toEqual("fourth");

    result.findWhere(n => _findRadio(n, "Option 2")).simulate("click");
    expect(result.state().checkedRadio).toEqual("second");
  });

  it("RadioGroup - Change props ", function() {
    const result = mount(
      <RadioGroupCore inline name="test">
        <RadioCore label="Option 1" value="first" />
        <RadioCore label="Option 2" value="second" />
        <RadioCore label="Option 3" value="third" />
        <RadioCore label="Option 4" value="fourth" />
        <RadioCore label="Option 5" value="fifth" />
        <RadioCore label="Option 6" value="sixth" />
      </RadioGroupCore>
    );
		
		result.setProps({name : "Name"});
	
    result.findWhere(n => _findRadio(n, "Option 4")).simulate("click");
    expect(result.state().checkedRadio).toEqual("fourth");
		
		result.setProps({selectedValue : "second"});
		expect(result.state().checkedRadio).toEqual("second");
  });	
});
