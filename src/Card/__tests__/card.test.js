import React from "react";
import { mount } from "enzyme";
import { CardCore } from "../../../react-atlas-core/src/Card/index";
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
});
