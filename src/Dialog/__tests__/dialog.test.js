import React from "react";
import { DialogCore } from "../../../react-atlas-core/src/Dialog/index";
import { ButtonCore } from "../../../react-atlas-core/src/Button/index";

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
        <ButtonCore primary onClick={handleToggle}>
          Open Info Dialog
        </ButtonCore>
        <DialogCore active onOk={handleOk} title="Info" overlay info>
          <div>
            This is Dialog example<br />Any child components could be put here.
          </div>
        </DialogCore>
      </div>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

//dial.find('button').simulate('click');
//dial.findWhere( (n)=> {if(n.props().primary){n.simulate('click')}} );//.simulate('click');
