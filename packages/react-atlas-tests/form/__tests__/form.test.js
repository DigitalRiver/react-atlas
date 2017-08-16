import React from "react";
import { mount } from "enzyme";
import { default as Form } from "../../../react-atlas-core/src/Form/Form";

describe("Test form component", () => {
  it("Test default props", function() {
    const result = mount(<Form />);
  });
});
