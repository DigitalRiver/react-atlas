import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import { AutocompleteCore } from "react-atlas-core";

let count = 0;
let inputProps = {
  "placeholder": "Type 'c'",
  "value": "value",
  "onChange": function() {
    count++;
  }
};

describe("Test Autocomplete component", () => {
  it("Test default props", function() {
    const result = mount(<AutocompleteCore inputProps={inputProps} />);
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
    const result = mount(<AutocompleteCore inputProps={inputProps} />);
    expect(result.props().inputProps).to.equal(inputProps);
  });

  it("Make sure onChange function can be called", function() {
    const result = shallow(<AutocompleteCore inputProps={inputProps} />);
    result.simulate("change", { "target": { "value": "1234567890!!!" } });
    expect(count).to.equal(1);
  });
});
