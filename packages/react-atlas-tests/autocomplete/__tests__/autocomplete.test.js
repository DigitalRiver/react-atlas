import React from "react";
import { mount, shallow } from "enzyme";
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
    expect(typeof result.props().onSuggestionsUpdateRequested).toBe(
      "function"
    );
    expect(typeof result.props().shouldRenderSuggestions).toBe("function");
    expect(typeof result.props().onSuggestionSelected).toBe("function");
    expect(typeof result.props().renderSectionTitle).toBe("function");
    expect(typeof result.props().getSectionSuggestions).toBe("function");
    expect(result.props().focusInputOnSuggestionClick).toBe(true);
    expect(result.props().id).toBe("1");

    expect(result.props().renderSectionTitle()).toThrow(Error);
    expect(result.props().getSectionSuggestions()).toThrow(new Error(
      "`getSectionSuggestions` must be provided"
    ));
  });

  it("Check inputProps", function() {
    const result = mount(<AutocompleteCore inputProps={inputProps} />);
    expect(result.props().inputProps).toBe(inputProps);
  });

  it("Make sure onChange function can be called", function() {
    const result = shallow(<AutocompleteCore inputProps={inputProps} />);
    result.simulate("change", { "target": { "value": "1234567890!!!" } });
    expect(count).toBe(1);
  });
});
