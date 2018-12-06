import React from "react";
import { mount } from "enzyme";
import { Portal } from "../index";

import renderer from "react-test-renderer";

beforeEach(() => {
  document.body.innerHTML = "";
});

describe("Test correct render", () => {
  it("Test correct render", function() {
    const tree = renderer.create(<Portal />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing Portal component", () => {
  it("applies props correctly", function() {
    mount(
      <Portal className="myClass">
        <div>foo</div>
      </Portal>
    );
    expect(document.body.querySelector(".ra_Portal__portal").className).toBe(
      "ra_Portal__portal myClass"
    );
  });

  it("applies default props correctly", function() {
    mount(
      <Portal>
        <div>foo</div>
      </Portal>
    );
    expect(document.body.querySelector(".ra_Portal__portal").className).toBe(
      "ra_Portal__portal"
    );
  });

  it("unmount removes element", function() {
    const portal = mount(
      <Portal>
        <div>foo</div>
      </Portal>
    );
    portal.unmount();
    expect(document.body.innerHTML).toBe("");
  });

  it("rerenders appropriately with new props", function() {
    let className = "myClass";
    const portal = mount(
      <Portal className={className}>
        <div>foo</div>
      </Portal>
    );
    portal.setProps({ className: "myNewClass" });
    expect(document.body.querySelectorAll(".myNewClass").length).toBe(1);
  });
});
