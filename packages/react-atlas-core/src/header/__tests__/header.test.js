import React from "react";
import { mount } from "enzyme";
import Header from "../../header";

describe("Test Header component", () => {
  it("Test default props", function() {
    const result = mount(<Header />);
  });
});
