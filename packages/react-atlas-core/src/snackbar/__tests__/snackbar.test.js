import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import Snackbar from "../../snackbar";
import sinon from "sinon";
import Button from "../../button";

let count = 0;

function timeout() {
  count++;
}

describe("Testing Snackbar component", () => {
  it("Make sure the right functions are called for various events", function() {
    let result = mount(<Snackbar />);
    const didUpdate = sinon.spy(Snackbar.prototype, "componentDidUpdate");

    /* Update some props so we cause the component to rerender. */
    result.setProps({ "active": true, "timeout": 2 });

    /* Make sure the componentDidUpdate function was called once. */
    sinon.assert.calledOnce(didUpdate);
  });
  it("Test snackbar with a child component", function() {
    let result = mount(
      <Snackbar action="Hide" timeout={20000} type="cancel">
        Snackbar Content
        <Button theme={{ "button": true }}>Hide</Button>
      </Snackbar>
    );
    expect(
      result.contains(<Button theme={{ "button": true }}>Hide</Button>)
    ).to.equal(true);
  });
  it("Make sure props passed in are correct", function() {
    let result = mount(
      <Snackbar action={"Hide"} active timeout={10} type={"cancel"} />
    );
    expect(result.props().action).to.equal("Hide");
    expect(result.props().active).to.equal(true);
    expect(result.props().timeout).to.equal(10);
    expect(result.props().type).to.equal("cancel");
  });

  it("Check update handler", function() {
    const didUpdate = sinon.spy(Snackbar.prototype, "componentDidUpdate");
    let result = mount(<Snackbar active timeout={1} onTimeout={timeout} />);
    result.update();
    sinon.assert.calledOnce(didUpdate);
    // expect(count).to.equal(1);
  });
});
