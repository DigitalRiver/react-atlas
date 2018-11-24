import React from "react";
import { mount, shallow } from "enzyme";
import { Alert } from "../index";
import renderer from "react-test-renderer";

describe("Test Alert component", () => {
  it("Test renders correctly", () => {
    const comp = 
      <Alert type="success">
        <strong>Success!</strong> This alert box indicates a successful or
        positive action.
      </Alert>
    ;
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test Alert Component: Basic Tests", () => {
  const alrtBasic = shallow(
    <Alert>This alert box indicates a successful or positive action.</Alert>
  );

  it("Basic alert ", () => {
    expect(alrtBasic.exists(<Alert />)).toBe(true);
  });

  it("Test Alert has no children", () => {
    const alrt = mount(<Alert />);

    expect(alrt.props().children).toBeUndefined();
  });

  it("Test Alert contains a child", () => {
    expect(alrtBasic.props()).toHaveProperty("children");
  });

  it("Test Alert has success type", () => {
    const alrt = mount(<Alert type="success">This is success</Alert>);

    expect(alrt.props().type).toBe("success");
  });

  it("Test Alert has info type", () => {
    const alrt = mount(<Alert type="info">This is info</Alert>);

    expect(alrt.props().type).toBe("info");
  });

  it("Test Alert has warning type", () => {
    const alrt = mount(<Alert type="warning">This is warning</Alert>);

    expect(alrt.props().type).toBe("warning");
  });

  it("Test Alert has danger type", () => {
    const alrt = mount(<Alert type="danger">This is danger</Alert>);

    expect(alrt.props().type).toBe("danger");
  });

  it("Test Alert is dismissible", () => {
    const alrt = mount(
      <Alert type="danger" dismissible>
        This is danger
      </Alert>
    );

    expect(alrt.props().dismissible).toBe(true);
  });

  it("Test Alert is dismissible and has onDismiss prop", () => {
    const alrt = mount(
      <Alert
        type="danger"
        dismissible
        onDismiss={function() {
          console.log("closed");
        }}
      >
        This is danger
      </Alert>
    );

    global.console = {
      "log": jest.fn()
    };

    expect(alrt.props().dismissible).toBe(true);
    expect(alrt.props().onDismiss).toBeDefined();

    alrt
      .find("div")
      .last()
      .simulate("click");
    expect(global.console.log).toBeCalled();
    expect(alrt.find("div").length).toBe(0);
  });

  it("Test Alert is dismissible when onDismiss prop is not defined", () => {
    const alrt = mount(
      <Alert type="danger" dismissible>
        This is danger
      </Alert>
    );

    expect(alrt.props().dismissible).toBe(true);

    alrt
      .find("div")
      .last()
      .simulate("click");
    expect(alrt.find("div").length).toBe(0);
  });
});
