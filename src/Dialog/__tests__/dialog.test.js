import React from "react";
import { mount } from "enzyme";
import { Dialog } from "../index";
import { Modal } from "../../Modal/index";
import { Overlay } from "../../Overlay/index";
import { Portal } from "../../Portal/index";
import { Button } from "../../Button/index";

import renderer from "react-test-renderer";

function handleToggle() {
  console.log("Inside handleToggle");
}
function handleOk() {
  console("-.-");
}

// function handleCancel() {
//   console(".-.");
// }

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
      <Dialog>
        <div>
          This is Dialog example<br />Any child components could be put here.
        </div>
      </Dialog>
    );
    expect(dial.props().active).toEqual(false);
  });

  // it("Dialog component(confirm) - Basic test", function() {
  //   const dial = mount(
  //     <div>
  //       <button onClick={handleToggle}>Open</button>
  //       <Dialog
  //       active
  //         onOk={handleOk}
  //         onCancel={handleCancel}
  //         title="Confirm"
  //         overlay
  //         confirm
  //         className={"dialogClass"}
  //       >
  //         <div>
  //           This is Dialog example<br />Any child components could be put here.
  //         </div>
  //       </Dialog>
  //     </div>
  //   );
  //   dial.find('button').simulate('click');
  //   expect(dial.find('.dialogClass').props().active).toBe(true);
  // });

  // it("Dialog component(warning) - Basic test", function() {
  //   const dial = mount(
  //     <div>
  //       <Button primary onClick={handleToggle}>
  //         Open warning Dialog
  //       </Button>
  //       <Dialog
  //         active
  //         onOk={handleOk}
  //         onCancel={handleCancel}
  //         title="Warning"
  //         overlay
  //         warning
  //       >
  //         <div>
  //           This is Dialog example<br />Any child components could be put here.
  //         </div>
  //       </Dialog>
  //     </div>
  //   );
  //   expect(dial.props().warning).toBe(true);
  //   dial.find('button').simulate('click');
  //   expect(dial.props().active).toBe(true);
  // });
});

//dial.find('button').simulate('click');
//dial.findWhere( (n)=> {if(n.props().primary){n.simulate('click')}} );//.simulate('click');
