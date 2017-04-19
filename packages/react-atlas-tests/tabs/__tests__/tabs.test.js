import React from "react";
import { mount } from "enzyme";
import { Tabs, Tab } from "react-atlas-core";
import sinon from "sinon";

let count = 0;

function activeCallback() {
  count++;
}

describe("Testing tabs component", () => {
  it("Check default props", function() {
    const result = mount(
      <Tabs>
        <Tab label="Primary">
          <small>Primary content</small>
        </Tab>
        <Tab label="Secondary" onActive={this.handleActive}>
          <small>Secondary content</small>
        </Tab>
        <Tab label="Third" disabled>
          <small>Disabled content</small>
        </Tab>
        <Tab label="Fourth" hidden>
          <small>Fourth content hidden</small>
        </Tab>
        <Tab label="Fifth">
          <small>Fifth content</small>
        </Tab>
      </Tabs>
    );
  });

  it("Check tab didUpdate function", function() {
    const didUpdate = sinon.spy(Tab.prototype, "componentDidUpdate");
    const result = mount(<Tab />);
    result.update();
    sinon.assert.calledOnce(didUpdate);
  });
  // it('Make sure onActive is called when set and didUpdate is called', function() {
  //   const result = mount(<Tab onActive={activeCallback}></Tab>);
  //   result.update();
  //   expect(count).to.equal(1);
  // });
  //
  // it('Check click handler', function() {
  //   const handleClick = sinon.spy(Tab.prototype, '_handleClick');
  //   const result = shallow(<Tab onClick={this._handleClick}></Tab>);
  //   result.simulate('click');
  //   sinon.assert.calledOnce(handleClick);
  // });
});
