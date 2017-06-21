import React from "react";
import { mount, shallow } from "enzyme";
import { MediaCore } from "react-atlas-core";

const width = "500";
const aspectRatio = "wide";

describe("Testing Media component", () => {
  it("Set props should match what was passed in", function() {
    const result = mount(<MediaCore aspectRatio={aspectRatio} />);
    expect(result.props().aspectRatio).toBe(aspectRatio);
  });
  it("Checking what was rendered", function() {
    const result = shallow(<MediaCore style={{ "width": width }} />);
    expect(result.type()).toBe("div");
    expect(typeof result.props().image).toBe("undefined");
    expect(result.find("div").first().props("style").style.width).toBe(
      width
    );
  });
});
