import React from "react";
import { mount } from "enzyme";
import { Dialog } from "../index";

// function handleCancel() {
//   console(".-.");
// }

it("Test renders correctly", () => {
  const tree = mount(<Dialog />);
  expect(tree).toMatchSnapshot();
});

describe("Dialog component - Basic test", () => {
  const dial = mount(
    <Dialog>
      <div>
        This is Dialog example<br />Any child components could be put here.
      </div>
    </Dialog>
  );
  it("Dialog component(info) - Basic test", function() {
    expect(dial.props().active).toEqual(false);
  });

  it("Test Dialog contains a child", () => {
    expect(dial.props()).toHaveProperty("children");
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
