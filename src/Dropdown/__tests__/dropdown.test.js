import React from "react";
import { mount, shallow, render } from "enzyme";

import renderer from "react-test-renderer";

import { DropdownCore } from "../../../react-atlas-core/src/Dropdown/index";

function _findItem(n, text) {
  if (n.props().children) {
    if (n.props().children.props) {
      let str = n.props().children.props.value;
      return str == text;
    }
  }
  return false;
}

describe("Test dropdown component", () => {
  it("Test render correctly", () => {
    const comp = (
      <DropdownCore onChange={function() {}}>
        <span>May</span>
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
});

describe("Test Dropdown component - Basic tests", () => {
  it("Test Dropdown component - Basic test", function() {
    const component = mount(
      <DropdownCore
        defaultText={"text"}
        customLabel={"MyLable"}
        onChange={function() {}}
      >
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    expect(component.state().value).toEqual(null);
    expect(component.state().output).toEqual("text");
  });

  it("Test Dropdown component - Basic test(with default value)", function() {
    const component = mount(
      <DropdownCore
        customLabel={"MyLable"}
        onChange={function() {}}
        value={"be"}
      >
        <span>May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");

    expect(component.state().output).toEqual("be");
    expect(component.state().focus).toEqual(true);
  });

  it("Test Dropdown component - Basic test (disabled)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} disabled={true}>
        <span>May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );

    expect(component.state().value).toEqual(null);
    expect(component.state().output).toEqual("May");

    component.find("Dropdown").simulate("focus");
    expect(component.state().output).toEqual("May");
    expect(component.state().active).toEqual(false);

    component.find("Dropdown").simulate("click");
    expect(component.state().output).toEqual("May");
    expect(component.state().active).toEqual(false);
  });

  it("Test Dropdown component - Basic test (required)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} required={true}>
        <span>May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );

    component.find("Button").simulate("click");
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });
  });

  it("Test Dropdown component - Basic test (required) II", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} required={true}>
        <span>May</span>
        <span value="">the</span>
        <span value="force">force</span>
      </DropdownCore>
    );

    component.find("Button").simulate("click");
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });
  });

  it("Test Dropdown component - Basic test (required) II", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} required={true}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
      </DropdownCore>
    );

    component.find("Button").simulate("click");
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });
  });

  it("Test Dropdown component - Basic test(Refresh)", function() {
    const component = mount(
      <DropdownCore customLabel={"MyLable"} onChange={function() {}}>
        <span>May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );

    component.find("Dropdown").simulate("focus");
    component.find("Button").simulate("click");
    component.findWhere(n => _findItem(n, "you")).simulate("mouseDown");
    component.update();
    expect(component.state().output).toEqual("you");
  });

  it("Test Dropdown component - Basic test(Refresh) II", function() {
    const component = mount(
      <DropdownCore customLabel={"MyLable"} onChange={function() {}}>
        <span>May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );

    component.find("Dropdown").simulate("focus");
    component.find("Button").simulate("click");
    component.findWhere(n => _findItem(n, "be")).simulate("mouseDown");
    component.setState({ isValid: false });
    component.update();
    expect(component.state().output).toEqual("be");
  });

  it("Test Dropdown component - Basic test(Refresh) III", function() {
    let drop1 = mount(
      <DropdownCore>
        <span value="One">1</span>
        <span value="Two">2</span>
        <span value="Three">3</span>
      </DropdownCore>
    );
    let drop2 = mount(
      <DropdownCore>
        <span value="One">1</span>
        <span value="Two">2</span>
      </DropdownCore>
    );

    drop1.state().children = drop2.state().children;
    drop1.state().childrenState = drop2.state().childrenState;

    drop1.update();
  });
});

describe("Test Dropdown component - Mouse tests", () => {
  it("Test Dropdown component - Click on drop down twice", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="">you</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    component.find("Button").simulate("click");
    component.find("Button").simulate("click");
  });

  it("Test Dropdown component - Select one empty item", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="">you</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    component.find("Button").simulate("click");
    component.findWhere(n => _findItem(n, "")).simulate("mouseDown");
  });

  it("Test Dropdown component - Select one item", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().output).toEqual("May");
    expect(component.state().focus).toEqual(true);
    component.find("Button").simulate("click");
    expect(component.state().active).toEqual(true);

    component.findWhere(n => _findItem(n, "you")).simulate("mouseDown");

    expect(component.state().value).toEqual("you");
    expect(component.state().index).toEqual(5);

    component.find("Dropdown").simulate("focus");
  });

  it("Test Dropdown component - Select one item - no onChange", function() {
    const component = mount(
      <DropdownCore onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().output).toEqual("May");
    expect(component.state().focus).toEqual(true);
    component.find("Button").simulate("click");
    expect(component.state().active).toEqual(true);

    component.findWhere(n => _findItem(n, "you")).simulate("mouseDown");

    expect(component.state().value).toEqual("you");
    expect(component.state().index).toEqual(5);

    component.find("Dropdown").simulate("focus");
  });

  it("Test Dropdown component - Select one item - no onClick", function() {
    const component = mount(
      <DropdownCore onChange={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().output).toEqual("May");
    expect(component.state().focus).toEqual(true);
    component.find("Button").simulate("click");
    expect(component.state().active).toEqual(true);

    component.findWhere(n => _findItem(n, "you")).simulate("mouseDown");

    expect(component.state().value).toEqual("you");
    expect(component.state().index).toEqual(5);

    component.find("Dropdown").simulate("focus");
  });

  it("Test Dropdown component - Select one item (twice)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );

    component.find("Dropdown").simulate("focus");
    expect(component.state().output).toEqual("May");
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
    component.findWhere(n => _findItem(n, "May")).simulate("mouseDown");
    expect(component.state().value).toEqual("May");
    expect(component.state().index).toEqual(0);
  });

  it("Test Dropdown component - Click with custon onClick Dropdown", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
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
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
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
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
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
  /*	These three tests are commented out until the "event not defined" issue is solved.
	it("Test Dropdown component - Select one item (only ArrowDown used - with errorCallback I)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}} errorCallback={function(ev, val){return true}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
		
    component.find("Button").simulate("click");
    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });

    expect(component.state().value).toEqual("the");
    expect(component.state().output).toEqual("the");
    expect(component.state().index).toEqual(1);
  });

	it("Test Dropdown component - Select one item (only ArrowDown used - with errorCallback II)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}} errorCallback={function(ev, val){return undefined}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
		
    component.find("Button").simulate("click");
    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    
		expect(function() {
			component.find("Dropdown").simulate("keyDown", { key: "Enter" });
    }).toThrow(new Error("undefined returned from the error callback"));
    expect(component.state().value).toEqual("May");
    expect(component.state().output).toEqual("May");
    expect(component.state().index).toEqual(1);
  });

	it("Test Dropdown component - Select one item (only ArrowDown used - with errorCallback III)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}} errorCallback={function(ev, val){return {"isValid": true, "errorMessage": "Error" }}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
		
    component.find("Button").simulate("click");
    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });

    expect(component.state().value).toEqual("the");
    expect(component.state().output).toEqual("the");
    expect(component.state().index).toEqual(1);
  });
	*/

  it("Test Dropdown component - Open the dropdown by hiting enter", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );

    expect(component.state().active).toEqual(false);

    component.find("Dropdown").simulate("keyDown", { key: "Enter" });

    expect(component.state().output).toEqual("May");
    expect(component.state().active).toEqual(true);
    expect(component.state().index).toEqual(0);
  });

  it("Test Dropdown component - Hit ENTER (disabled)", function() {
    const component = mount(
      <DropdownCore
        onChange={function() {}}
        onClick={function() {}}
        disabled={true}
      >
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );

    expect(component.state().active).toEqual(false);

    component.find("Dropdown").simulate("keyDown", { key: "Enter" });

    expect(component.state().output).toEqual("May");
    expect(component.state().index).toEqual(0);
  });

  it("Test Dropdown component - Hit ArrowDown twice", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    component.find("Button").simulate("click");

    expect(component.state().output).toEqual("May");

    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
  });

  it("Test Dropdown component - Select one item (only ArrowDown used)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().output).toEqual("May");
    expect(component.state().focus).toEqual(true);

    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });

    expect(component.state().value).toEqual("be");
    expect(component.state().output).toEqual("be");
    expect(component.state().index).toEqual(3);
  });

  it("Test Dropdown component - Select one item (only ArrowDown used - with errorCallback)", function() {
    const component = mount(
      <DropdownCore
        onChange={function() {}}
        onClick={function() {}}
        errorCallback={function(ev, val) {
          return true;
        }}
      >
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });

    expect(component.state().value).toEqual("the");
    expect(component.state().output).toEqual("the");
    expect(component.state().index).toEqual(1);
  });

  it("Test Dropdown component - Select one item (ArrowDown & ArrowUp used)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().output).toEqual("May");
    expect(component.state().focus).toEqual(true);

    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "ArrowUp" });
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });

    expect(component.state().value).toEqual("force");
    expect(component.state().output).toEqual("force");
    expect(component.state().index).toEqual(2);
  });

  it("Test Dropdown component - Select last item (only ArrowDown used)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().output).toEqual("May");
    expect(component.state().focus).toEqual(true);

    for (let i = 0; i < 9; i++) {
      component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    }
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });

    expect(component.state().value).toEqual("you");
    expect(component.state().output).toEqual("you");
    expect(component.state().index).toEqual(5);
  });

  it("Test Dropdown component - Select first item (going down & up with ArrowDown & Arrow up)", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().output).toEqual("May");
    expect(component.state().focus).toEqual(true);

    for (let i = 0; i < 9; i++) {
      component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    }
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });
    expect(component.state().value).toEqual("you");
    expect(component.state().output).toEqual("you");
    expect(component.state().index).toEqual(5);

    component.find("Dropdown").simulate("focus");
    expect(component.state().output).toEqual("you");
    expect(component.state().active).toEqual(true);

    for (let i = 0; i < 9; i++) {
      component.find("Dropdown").simulate("keyDown", { key: "ArrowUp" });
    }
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });
    expect(component.state().value).toEqual("May");
    expect(component.state().output).toEqual("May");
    expect(component.state().index).toEqual(0);
  });

  it("Test Dropdown component - Press unhandled key", function() {
    const component = mount(
      <DropdownCore onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().output).toEqual("May");
    expect(component.state().focus).toEqual(true);

    component.find("Dropdown").simulate("keyDown", { key: "Ctrl" });
  });
});

describe("Test Dropdown component - Window blur tests", () => {
  it("Test Dropdown component - onBlur event test", function() {
    const component = mount(
      <DropdownCore onChange={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );

    expect(component.state().value).toEqual("May");
    expect(component.state().output).toEqual("May");
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
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </DropdownCore>
    );
    expect(component.state().isValid).toEqual(false);
  });
});
