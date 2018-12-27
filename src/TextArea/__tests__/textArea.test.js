import React from "react";
import { TextArea } from "../index";
import { Form } from "../../Form/index";
import { mount } from "enzyme";

import renderer from "react-test-renderer";

describe("Test Text component", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<TextArea />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  //   it("TextArea component - Basic test (invalid)", function() {
  //     const textArea = mount(<TextArea isValid={false} />);
  //     textArea.update();
  //   });

  it("TextArea component - Tooltip with header", function() {
    const textArea = mount(
      <TextArea
        maxLength={10}
        label="Label"
        tooltip={"Tooltiptext"}
        header={"Header text."}
      />
    );
    expect(textArea.find("textarea").props().header).toBe("Header text.");
  });

  //   it("TextArea component - Tooltip with label", function() {
  //     const textArea = mount(
  //       <TextArea maxLength={10} label="Label" tooltip={"Tooltiptext"} />
  //     );
  //   });

  it("TextArea component - Focus event", function() {
    const textArea = mount(<TextArea />);
    expect(textArea.state().active).toEqual(false);
    textArea.find("textarea").simulate("focus");
    expect(textArea.state().active).toEqual(true);
    textArea.find("textarea").simulate("blur");
    expect(textArea.state().active).toEqual(false);
  });

  it("TextArea component - Simple text inserted", function() {
    const textArea = mount(<TextArea maxLength={10} />);
    textArea.find("textarea").simulate("change", { target: { value: "i" } });
    expect(textArea.state().value).toEqual("i");
  });

  it("TextArea component - Simple text inserted with uppercase prop", function() {
    const textArea = mount(<TextArea maxLength={10} uppercase />);
    textArea.find("textarea").simulate("change", { target: { value: "i" } });
    expect(textArea.state().value).toEqual("I");
  });

  it("CWRP change value, status", function() {
    let myValue = "foo";
    const textArea = mount(<TextArea value={myValue} />);
    expect(textArea.state().value).toBe("foo");
    expect(textArea.state().status).toBe(null);
    expect(textArea.state().message).toBe(null);
    textArea.setProps({ value: "bar", status: "success" });
    expect(textArea.state().value).toBe("bar");
    expect(textArea.state().status).toBe("success");
  });

  it("CWRP change value, message", function() {
    let myValue = "foo";
    const textArea = mount(<TextArea value={myValue} />);
    expect(textArea.state().value).toBe("foo");
    expect(textArea.state().status).toBe(null);
    expect(textArea.state().message).toBe(null);
    textArea.setProps({ value: "bar", message: "Success!" });
    expect(textArea.state().value).toBe("bar");
    expect(textArea.state().message).toBe("Success!");
  });

  it("does not update state if onBeforeChange returns false", function() {
    const handleBeforeChange = jest.fn().mockImplementation(() => false);

    const textArea = mount(
      <TextArea onBeforeChange={handleBeforeChange} value="foo" />
    );
    textArea.find("textarea").simulate("change", { target: { value: "bar" } });
    expect(handleBeforeChange).toBeCalled();
    expect(textArea.state().value).toBe("foo");
  });

  it("handles onFocus", function() {
    const handleFocus = jest.fn();

    const textArea = mount(<TextArea onFocus={handleFocus} value="foo" />);
    textArea.find("textarea").simulate("focus", {});
    expect(handleFocus).toBeCalledWith(expect.any(Object), {
      value: "foo",
      status: null,
      message: null
    });
  });

  it("handles onBlur", function() {
    const handleBlur = jest.fn();

    const textArea = mount(<TextArea onBlur={handleBlur} value="foo" />);
    textArea.find("textarea").simulate("blur");
    expect(handleBlur).toBeCalledWith(expect.any(Object), {
      value: "foo",
      status: null,
      message: null
    });
  });

  it("handles onChange", function() {
    const handleChange = jest.fn();

    const textArea = mount(<TextArea onChange={handleChange} value="foo" />);
    textArea.find("textarea").simulate("change", { target: { value: "bar" } });
    expect(handleChange).toBeCalledWith(expect.any(Object), {
      value: "bar",
      status: null,
      message: null
    });
  });

  it("validates in Form", function() {
    const event = {
      preventDefault: jest.fn()
    };
    const handleSubmit = jest.fn();
    const validate = jest.fn().mockImplementation(() => {
      return {
        status: "error",
        message: "this field is required"
      };
    });
    const form = mount(
      <Form onSubmit={handleSubmit}>
        <TextArea id="myTextArea" valid={validate} />
      </Form>
    );
    form.find("textarea").simulate("change");
    form.find("form").simulate("submit", event);
    expect(form.find(".error_message").exists()).toBe(true);
    expect(form.find(".error_message").text()).toBe("this field is required");
    expect(form.find("TextArea").instance().state.status).toBe("error");
    expect(form.find("TextArea").instance().state.message).toBe(
      "this field is required"
    );
  });
});
