import React from "react";
import { mount } from "enzyme";
import Dialog from "../index";
import Button from "../../Button/index";

import renderer from "react-test-renderer";

function handleToggle() {
  console.log("Inside handleToggle");
}
function handleOk() {
  console("-.-");
}

describe("Dialog component - Test correct render", () => {
  it("Test correct render", function() {});
  const tree = renderer
    .create(
      <div>
        <Button primary onClick={handleToggle}>
          Open Info Dialog
        </Button>
        <Dialog active onOk={handleOk} title="Info" overlay info>
          <div>
            This is Dialog example<br />Any child components could be put here.
          </div>
        </Dialog>
      </div>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe("Dialog component - Basic test", () => {
  it("Dialog component(info) - Basic test", function() {
    const dial = mount(
      <div>
        <Button primary onClick={handleToggle}>
          Open Info Dialog
        </Button>
        <Dialog active onOk={handleOk} title="Info" overlay info>
          <div>
            This is Dialog example<br />Any child components could be put here.
          </div>
        </Dialog>
      </div>
    );
  });

  it("Dialog component(confirm) - Basic test", function() {
    const dial = mount(
      <div>
        <Button primary onClick={handleToggle}>
          Open confirm Dialog
        </Button>
        <Dialog
          active
          onOk={handleOk}
          onCancel={handleCancel}
          title="Confirm"
          overlay
          confirm
        >
          <div>
            This is Dialog example<br />Any child components could be put here.
          </div>
        </Dialog>
      </div>
    );
  });

  it("Dialog component(warning) - Basic test", function() {
    const dial = mount(
      <div>
        <Button primary onClick={handleToggle}>
          Open warning Dialog
        </Button>
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
  });
});

//dial.find('button').simulate('click');
//dial.findWhere( (n)=> {if(n.props().primary){n.simulate('click')}} );//.simulate('click');
