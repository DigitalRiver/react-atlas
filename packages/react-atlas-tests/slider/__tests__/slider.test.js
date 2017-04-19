import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import { SliderCore } from "react-atlas-core";

describe("Test slider component", () => {
  it("Test default props", function() {
    const result = mount(<SliderCore />);
  });
});
