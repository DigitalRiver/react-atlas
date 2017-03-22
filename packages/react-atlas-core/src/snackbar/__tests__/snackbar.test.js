import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import { SnackbarCore, ButtonCore } from "../../index";
import sinon from "sinon";

let count = 0;

function timeout() {
  count++;
}

describe("Testing Snackbar component", () => {
  it("Make sure the right functions are called for various events", function() {
    let result = mount(<SnackbarCore />);
    const didUpdate = sinon.spy(SnackbarCore.prototype, "componentDidUpdate");

    /* Update some props so we cause the component to rerender. */
    result.setProps({ "active": true, "timeout": 2 });

    /* Make sure the componentDidUpdate function was called once. */
    sinon.assert.calledOnce(didUpdate);
  });
  it("Test snackbar with a child component", function() {
    let result = mount(
      <SnackbarCore action="Hide" timeout={20000} type="cancel">
        Snackbar Content
        <ButtonCore theme={{ "button": true }}>Hide</ButtonCore>
      </SnackbarCore>
    );
    expect(
      result.contains(<ButtonCore theme={{ "button": true }}>Hide</ButtonCore>)
    ).to.equal(true);
  });
  it("Make sure props passed in are correct", function() {
    let result = mount(
      <SnackbarCore action={"Hide"} active timeout={10} type={"cancel"} />
    );
    expect(result.props().action).to.equal("Hide");
    expect(result.props().active).to.equal(true);
    expect(result.props().timeout).to.equal(10);
    expect(result.props().type).to.equal("cancel");
  });

  it("Check update handler", function() {
    const didUpdate = sinon.spy(SnackbarCore.prototype, "componentDidUpdate");
    let result = mount(<SnackbarCore active timeout={1} onTimeout={timeout} />);
    result.update();
    sinon.assert.calledOnce(didUpdate);
    // expect(count).to.equal(1);
  });
});
