import React from "react";
import { mount, shallow } from "enzyme";
import { expect, should } from "chai";
import Autocomplete from "../../autocomplete";

let count = 0;

let inputProps = {
  "placeholder": "Type 'c'",
  "value": "value",
  "onChange": function() {
    count++;
  }
};

let badValueProps = {};

let badOnChangeProps = {
  "value": "value"
};

describe("Test Autocomplete component", () => {
  it("Test default props", function() {
    const result = mount(<Autocomplete inputProps={inputProps} />);
    expect(typeof result.props().onSuggestionsUpdateRequested).to.equal(
      "function"
    );
    expect(typeof result.props().shouldRenderSuggestions).to.equal("function");
    expect(typeof result.props().onSuggestionSelected).to.equal("function");
    expect(typeof result.props().renderSectionTitle).to.equal("function");
    expect(typeof result.props().getSectionSuggestions).to.equal("function");
    expect(result.props().focusInputOnSuggestionClick).to.equal(true);
    expect(result.props().id).to.equal("1");

    expect(result.props().renderSectionTitle()).to.throw(Error);
    expect(result.props().getSectionSuggestions()).to.throw(new Error(
      "`getSectionSuggestions` must be provided"
    ));
  });

  it("Check inputProps", function() {
    const result = mount(<Autocomplete inputProps={inputProps} />);
    expect(result.props().inputProps).to.equal(inputProps);
  });

  it("Make sure onChange function can be called", function() {
    const result = shallow(<Autocomplete inputProps={inputProps} />);
    result.simulate("change", { "target": { "value": "1234567890!!!" } });
    expect(count).to.equal(1);
  });

  it("Make sure error is thrown when no value is set.", function() {
    // const result = mount(<Autocomplete inputProps={badValueProps}></Autocomplete>)
    // expect(result.).to.throw(Error);
  });

  it("Make sure error is thrown when no onChange is set.", function() {
    // expect(mount(<Autocomplete inputProps={badOnChangeProps}></Autocomplete>)).toThrow(new Error('\'inputProps\' must have \'onChange\'.'));
  });
});
