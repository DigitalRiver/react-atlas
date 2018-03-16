import React from "react";
import { mount } from "enzyme";
import { CardCore } from "../../../react-atlas-core/src/Card/index";
import { default as Checkbox } from "../../../react-atlas-core/src/Checkbox/Checkbox";
import { default as CheckboxGroup } from "../../../react-atlas-core/src/CheckboxGroup/CheckboxGroup";
import { verifyPropsDefaultValue } from "../../utils/propsVerification";

import renderer from "react-test-renderer";

describe("Test Card component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<CardCore className={"name"} legend={"lalala"} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Card - Basic properties test", function() {
    const result = mount(<CardCore className={"name"} legend={"lalala"} />);
    const expected = new Map([["className", "name"], ["legend", "lalala"]]);
    expect(verifyPropsDefaultValue(result, expected)).toEqual(true);
  });

  it("Card - Children test", function() {
    const result = mount(
      <CardCore legend="Card Example">
        <CheckboxGroup title="Checkbox Group" name="checkboxGroup">
          <Checkbox label="Checkbox 1" checked />
          <Checkbox label="Checkbox 2" />
          <Checkbox label="Checkbox 3" />
        </CheckboxGroup>
      </CardCore>
    );
  });
});
