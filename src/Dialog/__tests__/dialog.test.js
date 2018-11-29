import React from "react";
import { mount } from "enzyme";
import { Dialog } from "../index";

// function handleCancel() {
//   console(".-.");
// }

// TO-DO Add a snapshot test.

describe("Dialog component - Basic test", () => {
  it("Dialog component(info) - Basic test", function() {
    const dial = mount(
      <Dialog>
        <div>
          This is Dialog example<br />Any child components could be put here.
        </div>
      </Dialog>
    );
    expect(dial.props().active).toEqual(false);
  });

  it("Dialog component(confirm) - Basic test", function() {
    const handleToggle = jest.fn();
    const handleOk = jest.fn();
    const handleCancel = jest.fn();
    const dial = mount(
      <div>
        <button onClick={handleToggle}>Open</button>
        <Dialog
          active
          onOk={handleOk}
          onCancel={handleCancel}
          title="Confirm"
          overlay
          confirm
          className={"dialogClass"}
        >
          <div>
            This is Dialog example<br />Any child components could be put here.
          </div>
        </Dialog>
      </div>
    );
    dial.find("button").simulate("click");
    expect(
      dial
        .find(".dialogClass")
        .children()
        .first()
        .props().active
    ).toBe(true);
  });

  it("Dialog component(warning) - Basic test", function() {
    const handleToggle = jest.fn();
    const handleOk = jest.fn();
    const handleCancel = jest.fn();
    const dial = mount(
      <div>
        <button onClick={handleToggle}>Open</button>
        <Dialog
          active
          onOk={handleOk}
          onCancel={handleCancel}
          title="Warning"
          overlay
          warning
        >
          <div>
            This is Dialog example<br />Any child components could be put here.
          </div>
        </Dialog>
      </div>
    );
    expect(dial.find("Dialog").props().warning).toBe(true);
  });
});
