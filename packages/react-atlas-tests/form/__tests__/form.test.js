import React from "react";
import { mount } from "enzyme";
import { FormCore } from "../../../react-atlas-core/src/Form/index";
import { ButtonCore } from "../../../react-atlas-core/src/Button/index";

describe("Test form component", () => {
  it("Test default props", function() {
    const result = mount(
      <FormCore>
        <span value="Adrian">Adrian</span>
      </FormCore>
    );
  });

  it("Test custom props", function() {
    const result = mount(
      <FormCore
        buttonClasses={["classA", "classB"]}
        /** Children components, Usually a Textfield, Dropdown, Input, etc */
        className={String} // PropTypes.string, PropTypes.object, PropTypes.array
        /** A callback that is fired when the form has passed validation
         * and is ready to submit. Returns the form data and the event object.  */
        onSubmit={() => {}}
        /** A Callback that is called when there is a form error. */
        onError={() => {}}
        /** The URL of the server to send data to. */
        action="http://happy-dude.evergreen-terrace.?n=742"
        buttonText={" Submit "}
        /** The HTTP method to use when action is set and
         * the form is submitting. */
        method={"POST"}
        /** An Object, array, or string of CSS classes to
         * apply to form children components.*/
        childClasses={["classA", "classB"]}
        /* Pass inline styles here. */
        //style = {"lalala"}
      />
    );
  });
});

describe("Test submit behavior", () => {
  it("Test simple submit", function() {
    const form = mount(
      <FormCore onSubmit={() => {}}>
        <span value="Adrian">Adrian</span>
      </FormCore>
    );
    form.simulate("submit");
  });

  it("Test simple submit with action", function() {
    const form = mount(
      <FormCore
        onSubmit={() => {}}
        action="http://happy-dude.evergreen-terrace.?n=742"
      >
        <span value="Adrian">Adrian</span>
      </FormCore>
    );
    form.simulate("submit");
  });

  it("Test simple submit without data", function() {
    const form = mount(<FormCore onSubmit={() => {}} />);
    form.simulate("submit");
  });

  it("Test simple submit with onError", function() {
    const form = mount(<FormCore onSubmit={() => {}} onError={() => {}} />);
    form.simulate("submit");
  });
});

describe("Test data", () => {
  it("Test simple submit", function() {
    const form = mount(
      <FormCore onSubmit={() => {}}>
        <span value="Adrian">Adrian</span>
        <ButtonCore />
        <span value="Adrian">Adrian</span>
        <span value="Adrian">Adrian</span>
      </FormCore>
    );
    form.simulate("submit");
  });
});
