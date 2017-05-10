import React from "react";
import { mount, shallow } from "enzyme";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownList
} from "react-atlas-core";
import Button from "react-atlas-core";
import sinon from "sinon";

const hideWrapper = sinon.spy(Dropdown.prototype, "_hide");

let count = 0;

function onHideTestHandler() {
  count++;
}

describe("Testing Dropdown component", () => {
  it("Check default props", function() {
    const result = mount(
      <Dropdown>
        <DropdownTrigger>
          <Button>Dropdown Button</Button>
        </DropdownTrigger>
        <DropdownContent>
          <DropdownList />
        </DropdownContent>
      </Dropdown>
    );
    expect(result.props().className).toBe("");
  });

  it("Check click handler function.", function() {
    const stub = sinon.spy(Dropdown.prototype, "onWindowClick");
    const result = shallow(<Dropdown />);
    result.simulate("click");
    sinon.assert.calledOnce(stub);
  });

  it("Make sure _isActive returns true when active is set.", function() {
    const result = shallow(<Dropdown active />);
    expect(result.instance()._isActive()).toBe(true);
  });

  it(
    "Make sure _hide is not called when a click event happens and active is not set.",
    function() {
      const result = shallow(<Dropdown />);
      result.simulate("click");
      expect(hideWrapper.called).toBe(false);
    }
  );

  it(
    "Make sure _hide is called when a click event happens and active=true.",
    function() {
      const result = shallow(<Dropdown active />);
      result.simulate("click");
      sinon.assert.calledOnce(hideWrapper);
    }
  );

  it(
    "Make sure active gets set back to false when a click event happens and active=true.",
    function() {
      const result = shallow(<Dropdown active />);
      result.simulate("click");
      expect(result.state().active).toBe(false);
    }
  );

  it(
    "Make sure onHide is called when it is set and a click event happens and active is set",
    function() {
      const result = shallow(<Dropdown active onHide={onHideTestHandler} />);
      result.simulate("click");
      expect(count).toBe(1);
    }
  );

  it(
    "Make sure onHide is not called when it is set and a click event happens and active is not set",
    function() {
      const result = shallow(<Dropdown onHide={onHideTestHandler} />);
      result.simulate("click");
      expect(count).toBe(0);
    }
  );

  it("Check show() function", function() {
    const result = shallow(<Dropdown onHide={onHideTestHandler} />);
    result.instance()._show();
  });
});
