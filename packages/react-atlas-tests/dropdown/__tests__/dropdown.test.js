import React from "react";
import { mount, shallow, render } from "enzyme";

import renderer from "react-test-renderer";

import { DropdownCore } from "../../../react-atlas-core/src/Dropdown/index";

function _findItem(n, text) {
  if (n.props().children) {
    if (n.props().children.props) {
      let str = n.props().children.props.value;
      return str === text;
    }
  }
  return false;
}

function _findOutput(component) {
  return component.find("Button span").text();
}

describe("Test dropdown component - Basic", () => {
  it("Test render correctly", () => {
    const comp = (
      <DropdownCore onChange={function() {}}>
        <span value="may">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Test Dropdown component - Basic test", function() {
    const component = mount(
      <DropdownCore>
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );

    expect(component.state().value).toEqual("may");
    expect(_findOutput(component)).toEqual("May");
    expect(component.state().index).toEqual(0);
  });

  it("Test Dropdown component - Pre-Set value", function() {
    const component = mount(
      <DropdownCore value="force">
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );

    expect(component.state().value).toEqual("force");
    expect(_findOutput(component)).toEqual("Force");
    expect(component.state().index).toEqual(2);
  });

  it("Test Dropdown component - Basic test (disabled)", function() {
    const component = mount(
      <DropdownCore value="the" disabled={true}>
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );

    expect(component.state().value).toEqual("the");
    expect(_findOutput(component)).toEqual("The");

    component.find("Dropdown").simulate("focus");
    expect(_findOutput(component)).toEqual("The");
    expect(component.state().active).toEqual(false);

    component.find("Dropdown").simulate("click");
    expect(_findOutput(component)).toEqual("The");
    expect(component.state().active).toEqual(false);
  });

  it("Test Dropdown component - Default Text", function() {
    let defaultText = "Select One...";
    const component = mount(
      <DropdownCore defaultText={defaultText}>
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );

    expect(component.state().value).toEqual("");
    expect(_findOutput(component)).toEqual(defaultText);
  });

  it("Test Dropdown component - update value prop", function() {
    const component = mount(
      <DropdownCore>
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );
    component.setProps({ value: "force" });
    expect(component.state().value).toEqual("force");
    expect(_findOutput(component)).toEqual("Force");
  });
});
describe("Test Dropdown component - error handling", () => {
  it("Test Dropdown component - Required", function() {
    let defaultText = "Select One...";
    const component = mount(
      <DropdownCore defaultText={defaultText} required>
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );
    component
      .find("Dropdown")
      .simulate("focus")
      .simulate("blur");
    expect(component.state().isValid).toEqual(false);
    expect(component.state().errorMessage).toEqual("This field is required");
    expect(component.state().value).toEqual("");
  });

  it("Test Dropdown component - custom validation and error message", function() {
    let customErrorMsg = "Custom error message!";
    let _errorCallback = () => {
      return { isValid: false, message: customErrorMsg };
    };

    const component = mount(
      <DropdownCore errorCallback={_errorCallback}>
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );
    component
      .find("Dropdown")
      .simulate("focus")
      .simulate("blur");
    expect(component.state().isValid).toEqual(false);
    expect(component.state().errorMessage).toEqual(customErrorMsg);
  });
});

describe("Test Dropdown component - Mouse tests", () => {
  it("Test Dropdown component - Select one item", function() {
    const component = mount(
      <DropdownCore>
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(_findOutput(component)).toEqual("May");
    expect(component.state().focus).toEqual(true);
    component.find("Button").simulate("click");
    expect(component.state().active).toEqual(true);

    component.findWhere(n => _findItem(n, "you")).simulate("mouseDown");

    expect(component.state().value).toEqual("you");
    expect(component.state().index).toEqual(5);
  });

  it("Test Dropdown component - Select one item (twice)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}}>
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );

    component.find("Dropdown").simulate("focus");
    expect(_findOutput(component)).toEqual("May");
    expect(component.state().focus).toEqual(true);
    component.find("Button").simulate("click");
    expect(component.state().active).toEqual(true);

    let item = component.findWhere(n => _findItem(n, "you"));
    item.simulate("mouseDown");
    item.simulate("click");
    expect(component.state().value).toEqual("you");
    expect(component.state().index).toEqual(5);

    component.find("Dropdown").simulate("focus");
    component.find("Button").simulate("click");
    component.findWhere(n => _findItem(n, "may")).simulate("mouseDown");
    expect(component.state().value).toEqual("may");
    expect(component.state().index).toEqual(0);
  });

  it("Test Dropdown component - Click with custom onClick Dropdown", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    component.find("Button").simulate("click");
    component.findWhere(n => _findItem(n, "you")).simulate("mouseDown");
  });

  it("Test Dropdown component - Simple Click on Dropdown with onBeforeChange(false)", function() {
    const component = mount(
      <DropdownCore
        onChange={function() {}}
        onBeforeChange={function() {
          return false;
        }}
      >
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    component.find("Button").simulate("click");
    let item = component.findWhere(n => _findItem(n, "you"));
    item.simulate("mouseDown");
    item.simulate("click");
  });

  it("Test Dropdown component - Simple Click on Dropdown with onBeforeChange(true)", function() {
    const component = mount(
      <DropdownCore
        onChange={function() {}}
        onBeforeChange={function() {
          return true;
        }}
      >
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    component.find("Button").simulate("click");
    let item = component.findWhere(n => _findItem(n, "you"));
    item.simulate("mouseDown");
    item.simulate("click");
  });
});

describe("Test Dropdown component - Keyboard tests", () => {
  it("Test Dropdown component - Select one item (only ArrowDown used)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(_findOutput(component)).toEqual("May");
    expect(component.state().focus).toEqual(true);

    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });

    expect(component.state().value).toEqual("be");
    expect(_findOutput(component)).toEqual("Be");
    expect(component.state().index).toEqual(3);
  });

  it("Test Dropdown component - Select one item (ArrowDown & ArrowUp used)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(_findOutput(component)).toEqual("May");
    expect(component.state().focus).toEqual(true);

    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "ArrowUp" });
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });

    expect(component.state().value).toEqual("force");
    expect(_findOutput(component)).toEqual("Force");
    expect(component.state().index).toEqual(2);
  });

  it("Test Dropdown component - Select last item (only ArrowDown used)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(_findOutput(component)).toEqual("May");
    expect(component.state().focus).toEqual(true);

    for (let i = 0; i < 9; i++) {
      component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    }
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });

    expect(component.state().value).toEqual("you");
    expect(_findOutput(component)).toEqual("You");
    expect(component.state().index).toEqual(5);
  });

  it("Test Dropdown component - Select first item (going down & up with ArrowDown & Arrow up)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(_findOutput(component)).toEqual("May");
    expect(component.state().focus).toEqual(true);

    for (let i = 0; i < 9; i++) {
      component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    }
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });
    expect(component.state().value).toEqual("you");
    expect(_findOutput(component)).toEqual("You");
    expect(component.state().index).toEqual(5);

    component.find("Dropdown").simulate("focus");
    expect(_findOutput(component)).toEqual("You");
    expect(component.state().active).toEqual(true);

    for (let i = 0; i < 9; i++) {
      component.find("Dropdown").simulate("keyDown", { key: "ArrowUp" });
    }
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });
    expect(component.state().value).toEqual("may");
    expect(_findOutput(component)).toEqual("May");
    expect(component.state().index).toEqual(0);
  });

  it("Test Dropdown component - Press unhandled key", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(_findOutput(component)).toEqual("May");
    expect(component.state().focus).toEqual(true);

    component.find("Dropdown").simulate("keyDown", { key: "Ctrl" });
  });
});

describe("Test Dropdown component - Window blur tests", () => {
  it("Test Dropdown component - onBlur event test", function() {
    const component = mount(
      <DropdownCore onChange={function() {}}>
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );

    expect(component.state().value).toEqual("may");
    expect(_findOutput(component)).toEqual("May");
    component.find("Dropdown").simulate("focus");
    component.find("Dropdown").simulate("blur");
  });
});

describe("Test Dropdown component - Dropdown Regression tests", () => {
  it("Regression test for bug #249", function() {
    expect(function() {
      const component = mount(<DropdownCore />);
    }).toThrow(
      new Error("You must pass at least one child component to Dropdown")
    );
    // expect.assertions(0);
  });
});

describe("Test Dropdown component - Dropdown Regression tests", () => {
  it("Regression test for bug #405", function() {
    const component = mount(
      <DropdownCore isValid={false}>
        <span value="may">May</span>
        <span value="the">The</span>
        <span value="force">Force</span>
        <span value="be">Be</span>
        <span value="with">With</span>
        <span value="you">You</span>
      </DropdownCore>
    );
    expect(component.state().isValid).toEqual(false);
  });
});
