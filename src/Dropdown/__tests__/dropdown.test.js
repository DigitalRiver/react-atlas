import React from "react";
import { mount, shallow } from "enzyme";
import { Dropdown } from "../index";
import { Option } from "../../Option/index";
import renderer from "react-test-renderer";

function _findItem(n, text) {
  if (n.props().children) {
    if (n.props().children.props) {
      let str = n.props().children.props.value;
      return str === text;
    }
  }
  return false;
}

describe("Test dropdown component", () => {
  it("Test render correctly", () => {
    const comp = 
      <Dropdown onChange={function() {}}>
        <Option text="May" value="" />
        <Option value="the" text="the" />
        <Option value="force" text="force" />
        <Option value="be" text="be" />
        <Option value="with" text="with" />
        <Option value="you" text="you" />
      </Dropdown>
    ;
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test Dropdown component - Basic tests", () => {
  const childrenComp = shallow(
    <Dropdown>
      <Option text="May" value="" />
      <Option value="the" text="the" />
      <Option value="force" text="force" />
      <Option value="be" text="be" />
      <Option value="with" text="with" />
      <Option value="you" text="you" />
    </Dropdown>
  );

  const optionsComp = mount(
    <Dropdown options={[{"text": "Yes", "value": "true"}, {"text": "No", "value": "false"}]} />
  );
  
  it("Test Dropdown renders properly", () => {
    expect(childrenComp.exists(<Dropdown></Dropdown>)).toBe(true);
  });

  it("Children render properly", () => {
    expect(childrenComp.find(Option).length).toEqual(6);
  });

  it("Options render properly", () => {
    expect(optionsComp.find(Option).length).toEqual(2);
  });
  
  it("Test Dropdown component - Basic test", function() {
    const component = shallow(
      <Dropdown
        value="be"
        label="Label"
      >
        <Option text="May" value="" />
        <Option value="the" text="the" />
        <Option value="force" text="force" />
        <Option value="be" text="be" />
        <Option value="with" text="with" />
        <Option value="you" text="you" />
      </Dropdown>
    );
    expect(component.state().value).toEqual("be");
    expect(component.state().display).toEqual("be");
  });
});

describe("Test Dropdown interactions", () => {
  const optionsComp = mount(
    <Dropdown options={[{"text": "Yes", "value": "true"}, {"text": "No", "value": "false"}]} />
  );

  it("Test that input changes update state.value", () => {
    optionsComp.find('input').at(0).simulate('change', {})
  });
});

/*
describe("Test Dropdown component - Mouse tests", () => {
  it("Test Dropdown component - Click on drop down twice", function() {
    const component = mount(
      <Dropdown onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="">you</span>
      </Dropdown>
    );
    component.find("Dropdown").simulate("focus");
    component.find("Button").simulate("click");
    component.find("Button").simulate("click");
  });

  it("Test Dropdown component - Select one empty item", function() {
    const component = mount(
      <Dropdown onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="">you</span>
      </Dropdown>
    );
    component.find("Dropdown").simulate("focus");
    component.find("Button").simulate("click");
    component.findWhere(n => _findItem(n, "")).simulate("mouseDown");
  });

  it("Test Dropdown component - Select one item", function() {
    const component = mount(
      <Dropdown onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().display).toEqual("May");
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
      <Dropdown onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().display).toEqual("May");
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
      <Dropdown onChange={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().display).toEqual("May");
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
      <Dropdown onChange={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );

    component.find("Dropdown").simulate("focus");
    expect(component.state().display).toEqual("May");
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
      <Dropdown onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );
    component.find("Dropdown").simulate("focus");
    component.find("Button").simulate("click");
    component.findWhere(n => _findItem(n, "you")).simulate("mouseDown");
  });

  it("Test Dropdown component - Simple Click on Dropdown with onBeforeChange(false)", function() {
    const component = mount(
      <Dropdown
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
      </Dropdown>
    );
    component.find("Dropdown").simulate("focus");
    component.find("Button").simulate("click");
    let item = component.findWhere(n => _findItem(n, "you"));
    item.simulate("mouseDown");
    item.simulate("click");
  });

  it("Test Dropdown component - Simple Click on Dropdown with onBeforeChange(true)", function() {
    const component = mount(
      <Dropdown
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
      </Dropdown>
    );
    component.find("Dropdown").simulate("focus");
    component.find("Button").simulate("click");
    let item = component.findWhere(n => _findItem(n, "you"));
    item.simulate("mouseDown");
    item.simulate("click");
  });
});
*/

/*
describe("Test Dropdown component - Keyboard tests", () => {
  These three tests are commented out until the "event not defined" issue is solved.
	it("Test Dropdown component - Select one item (only ArrowDown used - with errorCallback I)", function() {
    const component = mount(
      <Dropdown onChange={function() {}} onClick={function() {}} errorCallback={function(ev, val){return true}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );
		
    component.find("Button").simulate("click");
    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });

    expect(component.state().value).toEqual("the");
    expect(component.state().display).toEqual("the");
    expect(component.state().index).toEqual(1);
  });

	it("Test Dropdown component - Select one item (only ArrowDown used - with errorCallback II)", function() {
    const component = mount(
      <Dropdown onChange={function() {}} onClick={function() {}} errorCallback={function(ev, val){return undefined}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );
		
    component.find("Button").simulate("click");
    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    
		expect(function() {
			component.find("Dropdown").simulate("keyDown", { key: "Enter" });
    }).toThrow(new Error("undefined returned from the error callback"));
    expect(component.state().value).toEqual("May");
    expect(component.state().display).toEqual("May");
    expect(component.state().index).toEqual(1);
  });

	it("Test Dropdown component - Select one item (only ArrowDown used - with errorCallback III)", function() {
    const component = mount(
      <Dropdown onChange={function() {}} onClick={function() {}} errorCallback={function(ev, val){return {"isValid": true, "errorMessage": "Error" }}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );
		
    component.find("Button").simulate("click");
    component.find("Dropdown").simulate("keyDown", { key: "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { key: "Enter" });

    expect(component.state().value).toEqual("the");
    expect(component.state().display).toEqual("the");
    expect(component.state().index).toEqual(1);
  });

  it("Test Dropdown component - Open the dropdown by hiting enter", function() {
    const component = mount(
      <Dropdown onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );

    expect(component.state().active).toEqual(false);

    component.find("Dropdown").simulate("keyDown", { "key": "Enter" });

    expect(component.state().display).toEqual("May");
    expect(component.state().active).toEqual(true);
    expect(component.state().index).toEqual(0);
  });

  it("Test Dropdown component - Hit ENTER (disabled)", function() {
    const component = mount(
      <Dropdown onChange={function() {}} onClick={function() {}} disabled>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );

    expect(component.state().active).toEqual(false);

    component.find("Dropdown").simulate("keyDown", { "key": "Enter" });

    expect(component.state().display).toEqual("May");
    expect(component.state().index).toEqual(0);
  });

  it("Test Dropdown component - Hit ArrowDown twice", function() {
    const component = mount(
      <Dropdown onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );
    component.find("Button").simulate("click");

    expect(component.state().display).toEqual("May");

    component.find("Dropdown").simulate("keyDown", { "key": "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { "key": "ArrowDown" });
  });

  it("Test Dropdown component - Select one item (only ArrowDown used)", function() {
    const component = mount(
      <Dropdown onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().display).toEqual("May");
    expect(component.state().focus).toEqual(true);

    component.find("Dropdown").simulate("keyDown", { "key": "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { "key": "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { "key": "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { "key": "Enter" });

    expect(component.state().value).toEqual("be");
    expect(component.state().display).toEqual("be");
    expect(component.state().index).toEqual(3);
  });

  it("Test Dropdown component - Select one item (only ArrowDown used - with errorCallback)", function() {
    const component = mount(
      <Dropdown
        onChange={function() {}}
        onClick={function() {}}
        errorCallback={function() {
          return true;
        }}
      >
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );
    component.find("Dropdown").simulate("focus");
    component.find("Dropdown").simulate("keyDown", { "key": "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { "key": "Enter" });

    expect(component.state().value).toEqual("the");
    expect(component.state().display).toEqual("the");
    expect(component.state().index).toEqual(1);
  });

  it("Test Dropdown component - Select one item (ArrowDown & ArrowUp used)", function() {
    const component = mount(
      <Dropdown onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().display).toEqual("May");
    expect(component.state().focus).toEqual(true);

    component.find("Dropdown").simulate("keyDown", { "key": "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { "key": "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { "key": "ArrowDown" });
    component.find("Dropdown").simulate("keyDown", { "key": "ArrowUp" });
    component.find("Dropdown").simulate("keyDown", { "key": "Enter" });

    expect(component.state().value).toEqual("force");
    expect(component.state().display).toEqual("force");
    expect(component.state().index).toEqual(2);
  });

  it("Test Dropdown component - Select last item (only ArrowDown used)", function() {
    const component = mount(
      <Dropdown onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().display).toEqual("May");
    expect(component.state().focus).toEqual(true);

    for (let i = 0; i < 9; i++) {
      component.find("Dropdown").simulate("keyDown", { "key": "ArrowDown" });
    }
    component.find("Dropdown").simulate("keyDown", { "key": "Enter" });

    expect(component.state().value).toEqual("you");
    expect(component.state().display).toEqual("you");
    expect(component.state().index).toEqual(5);
  });

  it("Test Dropdown component - Select first item (going down & up with ArrowDown & Arrow up)", function() {
    const component = mount(
      <Dropdown onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().display).toEqual("May");
    expect(component.state().focus).toEqual(true);

    for (let i = 0; i < 9; i++) {
      component.find("Dropdown").simulate("keyDown", { "key": "ArrowDown" });
    }
    component.find("Dropdown").simulate("keyDown", { "key": "Enter" });
    expect(component.state().value).toEqual("you");
    expect(component.state().display).toEqual("you");
    expect(component.state().index).toEqual(5);

    component.find("Dropdown").simulate("focus");
    expect(component.state().display).toEqual("you");
    expect(component.state().active).toEqual(true);

    for (let i = 0; i < 9; i++) {
      component.find("Dropdown").simulate("keyDown", { "key": "ArrowUp" });
    }
    component.find("Dropdown").simulate("keyDown", { "key": "Enter" });
    expect(component.state().value).toEqual("May");
    expect(component.state().display).toEqual("May");
    expect(component.state().index).toEqual(0);
  });

  it("Test Dropdown component - Press unhandled key", function() {
    const component = mount(
      <Dropdown onChange={function() {}} onClick={function() {}}>
        <span value="May">May</span>
        <span value="the">the</span>
        <span value="force">force</span>
        <span value="be">be</span>
        <span value="with">with</span>
        <span value="you">you</span>
      </Dropdown>
    );
    component.find("Dropdown").simulate("focus");
    expect(component.state().display).toEqual("May");
    expect(component.state().focus).toEqual(true);

    component.find("Dropdown").simulate("keyDown", { "key": "Ctrl" });
  });
});
*/

/*
describe("Test Dropdown component - Window blur tests", () => {
  it("Test Dropdown component - onBlur event test", function() {
    let blurValue = "";
    let focusValue = "";
    const component = mount(
      <Dropdown value="force"  onFocus={(e, data) => {focusValue = data.value}} onBlur={(e, data) => {blurValue = data.value}}>
        <Option value="May" text="May" />
        <Option value="the" text="the" />
        <Option value="force" text="force" />
        <Option value="be" text="be" />
        <Option value="with" text="with" />
        <Option value="you" text="you" />
      </Dropdown>
    );
    expect(blurValue).toEqual("");
    expect(focusValue).toEqual("");
    component.instance().onFocus = jest.fn();
    component.find("Dropdown").prop("onFocus");
    expect(focusValue).toEqual("force");
    expect(component.state().focus).toEqual(true);
    component.find("Dropdown").simulate("blur");
    expect(component.state().focus).toEqual(false);
  });
});
*/

describe("Test Dropdown component - Dropdown Regression tests", () => {
  it("Test preset status with children", function() {
    const component = mount(
      <Dropdown status="error">
        <Option value="May" text="May" />
        <Option value="the" text="the" />
        <Option value="force" text="force" />
        <Option value="be" text="be" />
        <Option value="with" text="with" />
        <Option value="you" text="you" />
      </Dropdown>
    );
    expect(component.state().status).toEqual("error");
    
  });
});