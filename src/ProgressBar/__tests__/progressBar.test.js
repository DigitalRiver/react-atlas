import React from "react";
import { mount } from "enzyme";
import { ProgressBar } from "../index";

import renderer from "react-test-renderer";

beforeEach(() => {
  document.body.innerHTML = "";
});

describe("Test correct render", () => {
  it("Test correct render default linear", function() {
    const tree = renderer.create(<ProgressBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Test correct render circular", function() {
    const tree = renderer.create(<ProgressBar type="circular" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing Portal component", () => {
  it("applies default props correctly", function() {
    const pb = mount(<ProgressBar />);
    expect(pb.props().buffer).toBe(0);
    expect(pb.props().className).toBe("");
    expect(pb.props().max).toBe(100);
    expect(pb.props().min).toBe(0);
    expect(pb.props().transitionDuration).toBe(".35s");
    expect(pb.props().mode).toBe("indeterminate");
    expect(pb.props().type).toBe("linear");
    expect(pb.props().value).toBe(0);
  });

  it("linear type renders two spans", function() {
    const pb = mount(<ProgressBar type="linear" />);
    expect(pb.find("span").length).toBe(2);
    expect(
      pb
        .find("span")
        .first()
        .props().className
    ).toBe("buffer");
    expect(
      pb
        .find("span")
        .last()
        .props().className
    ).toBe("value");
  });

  it("determinate linear type renders with style transform", function() {
    const pb = mount(<ProgressBar type="linear" mode="determinate" />);
    expect(pb.find("span").length).toBe(2);
    expect(
      pb
        .find("span")
        .first()
        .props().className
    ).toBe("buffer");
    expect(
      pb
        .find("span")
        .first()
        .props().style.transform
    ).toBeDefined();
    expect(
      pb
        .find("span")
        .last()
        .props().className
    ).toBe("value");
    expect(
      pb
        .find("span")
        .last()
        .props().style.transform
    ).toBeDefined();
  });

  it("calculates ratio correctly for min", function() {
    const pb = mount(
      <ProgressBar
        type="linear"
        mode="determinate"
        min={0}
        max={100}
        value={-1}
      />
    );
    expect(pb.find("span").length).toBe(2);
    expect(
      pb
        .find("span")
        .first()
        .props().className
    ).toBe("buffer");
    expect(
      pb
        .find("span")
        .first()
        .props().style.transform
    ).toContain("scaleX(0)");
  });

  it("calculates ratio correctly for max", function() {
    const pb = mount(
      <ProgressBar
        type="linear"
        mode="determinate"
        min={0}
        max={50}
        value={100}
      />
    );
    expect(pb.find("span").length).toBe(2);
    expect(
      pb
        .find("span")
        .last()
        .props().className
    ).toBe("value");
    expect(
      pb
        .find("span")
        .last()
        .props().style.transform
    ).toContain("scaleX(1)");
  });

  it("renders range when value is not a number", function() {
    const pb = mount(
      <ProgressBar type="linear" value={{ from: 10, to: 50 }} />
    );
    expect(pb.find("span").length).toBe(1);
    expect(
      pb
        .find("span")
        .last()
        .props().className
    ).toBe("value");
    expect(
      pb
        .find("span")
        .last()
        .props().style.transform
    ).toContain("translateX(10%)");
    expect(
      pb
        .find("span")
        .last()
        .props().style.transform
    ).toContain("scaleX(0.4)");
  });

  it("circular type renders an svg", function() {
    const pb = mount(<ProgressBar type="circular" />);
    expect(pb.find("svg").length).toBe(1);
    expect(pb.find("svg").props().className).toBe("circle");
    expect(pb.find("circle").props().className).toBe("path");
  });

  it("determinate type renders style strokeDasharray", function() {
    const pb = mount(<ProgressBar type="circular" mode="determinate" />);
    expect(pb.find("svg").length).toBe(1);
    expect(pb.find("svg").props().className).toBe("circle");
    expect(pb.find("circle").props().className).toBe("path");
    expect(pb.find("circle").props().style.strokeDasharray).toBeDefined();
  });

  it("handles color and style props", function() {
    const pb = mount(
      <ProgressBar
        type="circular"
        color="blue"
        style={{ backgroundColor: "red" }}
      />
    );
    console.log(pb.html());
    expect(pb.find("circle").props().style.stroke).toEqual("blue");
    expect(pb.find("div").props().style).toEqual({ backgroundColor: "red" });
  });

  it("linear determinate handles transitionDuration props", function() {
    const pb = mount(
      <ProgressBar type="linear" mode="determinate" transitionDuration=".35s" />
    );
    expect(
      pb
        .find("span")
        .first()
        .props().style.transitionDuration
    ).toContain(".35s");
    expect(
      pb
        .find("span")
        .last()
        .props().style.transitionDuration
    ).toContain(".35s");
  });
});
