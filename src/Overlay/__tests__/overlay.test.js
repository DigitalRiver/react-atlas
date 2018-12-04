import React from "react";
import { mount } from "enzyme";
import { Overlay } from "../index";

import renderer from "react-test-renderer";

describe("Test correct render", () => {
  it("Test correct render", function() {
    const tree = renderer
      .create(<Overlay active lockScroll onEscKeyDown={jest.fn()} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing NavItem component", () => {
  it("unmount removes element", function() {
    const overlay = mount(<Overlay />);
    overlay.unmount();
    expect(overlay.html()).toBe(null);
  });

  it("unmount cleans up", function() {
    const overlay = mount(
      <Overlay active lockScroll onEscKeyDown={jest.fn()} />
    );
    expect(document.body.style.overflow).toBe("hidden");
    overlay.unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("handles click", function() {
    const handleClick = jest.fn();
    const event = {
      "preventDefault": jest.fn(),
      "stopPropagation": jest.fn()
    };
    const overlay = mount(<Overlay onClick={handleClick} />);
    overlay.simulate("click", event);
    expect(handleClick).toBeCalled();
    expect(event.preventDefault).toBeCalled();
    expect(event.stopPropagation).toBeCalled();
  });

  it("stops defaults and propagation on click when onClick is not defined", function() {
    const handleClick = jest.fn();
    const event = {
      "preventDefault": jest.fn(),
      "stopPropagation": jest.fn()
    };
    const overlay = mount(<Overlay />);
    overlay.simulate("click", event);
    expect(handleClick).not.toBeCalled();
    expect(event.preventDefault).toBeCalled();
    expect(event.stopPropagation).toBeCalled();
  });

  it("handles onEscKeyDown", function() {
    const handleEsc = jest.fn();
    const overlay = mount(<Overlay active onEscKeyDown={handleEsc} />); //eslint-disable-line no-unused-vars

    document.body.dispatchEvent(new KeyboardEvent("keydown", { "which": "27" }));
    expect(handleEsc).toBeCalled();
  });

  it("does not onEscKeyDown when a different key is pressed", function() {
    const handleEsc = jest.fn();
    const overlay = mount(<Overlay active onEscKeyDown={handleEsc} />); //eslint-disable-line no-unused-vars

    document.body.dispatchEvent(new KeyboardEvent("keydown", { "which": "28" }));
    expect(handleEsc).not.toBeCalled();
  });
});
