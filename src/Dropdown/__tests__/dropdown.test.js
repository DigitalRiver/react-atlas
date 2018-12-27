import React from "react";
import { mount, shallow } from "enzyme";
import { Dropdown } from "../index";
import { Option } from "../../Option/index";
import renderer from "react-test-renderer";

describe("Test dropdown component", () => {
  it("Test render correctly", () => {
    const comp = (
      <Dropdown onChange={function() {}}>
        <Option text="May" value="" />
        <Option value="the" text="the" />
        <Option value="force" text="force" />
        <Option value="be" text="be" />
        <Option value="with" text="with" />
        <Option value="you" text="you" />
      </Dropdown>
    );
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test Dropdown component - Basic tests", () => {
  const childrenComp = shallow(
    <Dropdown>
      <Option text="May" value="" />
      <Option value="the" text="the" />
      <Option value="force" text="force" />
      <Option value="be" text="be" />
      <Option value="with" text="with" />
      <Option value="you" text="you" />
    </Dropdown>
  );

  const optionsComp = mount(
    <Dropdown
      options={[{ text: "Yes", value: "true" }, { text: "No", value: "false" }]}
    />
  );

  it("Test Dropdown renders properly", () => {
    expect(childrenComp.exists(<Dropdown />)).toBe(true);
  });

  it("Children render properly", () => {
    expect(childrenComp.find(Option).length).toEqual(6);
  });

  it("Options render properly", () => {
    expect(optionsComp.find(Option).length).toEqual(2);
  });

  it("Test Dropdown component - Basic test", function() {
    const component = shallow(
      <Dropdown value="be" label="Label">
        <Option text="May" value="" />
        <Option value="the" text="the" />
        <Option value="force" text="force" />
        <Option value="be" text="be" />
        <Option value="with" text="with" />
        <Option value="you" text="you" />
      </Dropdown>
    );
    expect(component.state().value).toEqual("be");
    expect(component.state().display).toEqual("be");
  });

  it("Test preset status", function() {
    const component = mount(
      <Dropdown status="error">
        <Option value="May" text="May" />
        <Option value="the" text="the" />
        <Option value="force" text="force" />
        <Option value="be" text="be" />
        <Option value="with" text="with" />
        <Option value="you" text="you" />
      </Dropdown>
    );
    expect(component.state().status).toEqual("error");
  });
});

describe("Test Dropdown component - setOptions() method", () => {
  const component = mount(
    <Dropdown
      name="dataDropdown"
      id="dataDropdown"
      options={[{ text: "Yes", value: "true" }, { text: "No", value: "false" }]}
    />
  );
  const instance = component.instance();
  it("Test _alwaysTrue()", function() {
    expect(instance._alwaysTrue()).toBe(true);
  });
  it("Test initial setOptions() call", function() {
    const returnObject = instance.setOptions({}, component.props());
    expect(returnObject.options.length).toBe(2);
    expect(returnObject.display).toBe("");
    expect(returnObject.value).toBe("");
    expect(returnObject.selectedIndex).toBe(null);
    expect(returnObject.options[0].props.selected).toBe(false);
    expect(returnObject.options[1].props.selected).toBe(false);
    expect(returnObject.options[0].props.hover).toBe(false);
    expect(returnObject.options[1].props.hover).toBe(false);
  });
  it("Test cwrp setOptions() call", function() {
    const nextProps = {
      value: "horse",
      name: "dataDropdown",
      id: "dataDropdown",
      options: [
        { text: "Cow", value: "cow" },
        { text: "Horse", value: "horse" },
        { text: "Zebra", value: "zebra" }
      ],
      tooltipPosition: "right"
    };
    const returnObject = instance.setOptions({}, nextProps, false, true);
    expect(returnObject.options.length).toBe(3);
    expect(returnObject.display).toBe("Horse");
    expect(returnObject.value).toBe("horse");
    expect(returnObject.selectedIndex).toBe(1);
    expect(returnObject.options[0].props.selected).toBe(false);
    expect(returnObject.options[1].props.selected).toBe(true);
    expect(returnObject.options[0].props.hover).toBe(false);
    expect(returnObject.options[1].props.hover).toBe(false);
  });

  it("Test optionOnClick setOptions() call", function() {
    const updatedValues = { tempIndex: null, selectedIndex: 1, value: "false" };
    const returnObject = instance.setOptions(updatedValues, component.props());
    expect(returnObject.options.length).toBe(2);
    expect(returnObject.display).toBe("No");
    expect(returnObject.value).toBe("false");
    expect(returnObject.selectedIndex).toBe(1);
    expect(returnObject.options[0].props.selected).toBe(false);
    expect(returnObject.options[1].props.selected).toBe(true);
    expect(returnObject.options[0].props.hover).toBe(false);
    expect(returnObject.options[1].props.hover).toBe(false);
  });
  it("Test optionOnMouseOver & _handleKeyDown (active: true) setOptions() call", function() {
    const updatedValues = { tempIndex: 0 };
    const returnObject = instance.setOptions(
      updatedValues,
      component.props(),
      false,
      false,
      true
    );
    expect(returnObject.options.length).toBe(2);
    expect(returnObject.display).toBe("");
    expect(returnObject.value).toBe("");
    expect(returnObject.selectedIndex).toBe(null);
    expect(returnObject.options[0].props.selected).toBe(false);
    expect(returnObject.options[1].props.selected).toBe(false);
    expect(returnObject.options[0].props.hover).toBe(true);
    expect(returnObject.options[1].props.hover).toBe(false);
  });
  it("Test _handleChange setOptions() call", function() {
    const updatedValues = { selectedIndex: null, display: "No" };
    const returnObject = instance.setOptions(
      updatedValues,
      component.props(),
      true
    );
    expect(returnObject.options.length).toBe(1);
    expect(returnObject.display).toBe("No");
    expect(returnObject.value).toBe("false");
    expect(returnObject.selectedIndex).toBe(0);
    expect(returnObject.options[0].props.selected).toBe(true);
    expect(returnObject.options[0].props.hover).toBe(false);
  });
  it("Test _handleKeyDown (active: false) setOptions() call", function() {
    const updatedValues = { selectedIndex: 0 };
    const returnObject = instance.setOptions(
      updatedValues,
      component.props(),
      false,
      false,
      true
    );
    expect(returnObject.options.length).toBe(2);
    expect(returnObject.display).toBe("Yes");
    expect(returnObject.value).toBe("true");
    expect(returnObject.selectedIndex).toBe(0);
    expect(returnObject.options[0].props.selected).toBe(true);
    expect(returnObject.options[1].props.selected).toBe(false);
    expect(returnObject.options[0].props.hover).toBe(false);
    expect(returnObject.options[1].props.hover).toBe(false);
  });

  it("Test cwrp updates options, value, status", function() {
    const dd = mount(
      <Dropdown
        name="dataDropdown"
        id="dataDropdown"
        options={[
          { text: "Yes", value: "true" },
          { text: "No", value: "false" }
        ]}
      />
    );
    const nextProps = {
      value: "horse",
      status: "warning",
      options: [
        { text: "Cow", value: "cow" },
        { text: "Horse", value: "horse" },
        { text: "Zebra", value: "zebra" }
      ]
    };
    dd.setProps(nextProps);
    expect(dd.state().options[0].props.text).toEqual(nextProps.options[0].text);
    expect(dd.state().options[0].props.value).toEqual(
      nextProps.options[0].value
    );
    expect(dd.state().value).toBe(nextProps.value);
    expect(dd.state().status).toBe(nextProps.status);
  });

  it("Test cwrp updates state message", function() {
    const dd = mount(
      <Dropdown
        name="dataDropdown"
        id="dataDropdown"
        options={[
          { text: "Yes", value: "true" },
          { text: "No", value: "false" }
        ]}
        message="pick one"
      />
    );
    const nextProps = {
      message: "no really, pick one"
    };
    dd.setProps(nextProps);
    expect(dd.state().message).toBe(nextProps.message);
  });

  it("Test CWRP does not set state if props other than options, children, value, status, or message are changed", function() {
    const dd = mount(
      <Dropdown
        name="dataDropdown"
        id="dataDropdown"
        options={[
          { text: "Yes", value: "true" },
          { text: "No", value: "false" }
        ]}
        message="pick one"
        status="warning"
      />
    );
    const nextProps = {
      tooltip: "Foo"
    };
    let oldState = dd.state();
    dd.setProps(nextProps);
    expect(dd.state()).toEqual(oldState);
  });

  it("valueOnly sets text field name", function() {
    const dd = mount(
      <Dropdown
        name="dataDropdown"
        id="dataDropdown"
        options={[
          { text: "Yes", value: "true" },
          { text: "No", value: "false" }
        ]}
      />
    );
    expect(
      dd
        .find("input")
        .first()
        .html()
    ).not.toContain("name");
    dd.setProps({ valueOnly: true });
    expect(
      dd
        .find("input")
        .first()
        .html()
    ).toContain('name="dataDropdown"');
  });

  it("handles focus and blur", function() {
    const event = {
      persist: jest.fn()
    };
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const dd = mount(
      <Dropdown
        name="dataDropdown"
        id="dataDropdown"
        options={[
          { text: "Yes", value: "true" },
          { text: "No", value: "false" }
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value=""
      />
    );
    dd.find("input")
      .first()
      .simulate("focus", event);
    expect(event.persist).toBeCalled();
    expect(dd.state().focus).toBe(true);
    expect(handleFocus).toBeCalled();
    dd.find("input")
      .first()
      .simulate("blur", event);
    expect(event.persist).toBeCalled();
    expect(dd.state().focus).toBe(false);
    expect(handleBlur).toBeCalled();
    expect(dd.state().value).toBe("");
  });

  it("handles click", function() {
    const event = {
      persist: jest.fn()
    };
    const handleClick = jest.fn();
    const dd = mount(
      <Dropdown
        name="dataDropdown"
        id="dataDropdown"
        options={[
          { text: "Yes", value: "true" },
          { text: "No", value: "false" }
        ]}
        onClick={handleClick}
      />
    );
    dd.find("input")
      .first()
      .simulate("click", event);
    expect(handleClick).toBeCalled();
    expect(event.persist).toBeCalled();
    expect(dd.state().active).toBe(true);
  });

  it("handles click with no onClick prop and readOnly", function() {
    const event = {
      persist: jest.fn()
    };
    const handleClick = jest.fn();
    const dd = mount(
      <Dropdown
        name="dataDropdown"
        id="dataDropdown"
        options={[
          { text: "Yes", value: "true" },
          { text: "No", value: "false" }
        ]}
        readOnly
      />
    );
    dd.find("input")
      .first()
      .simulate("click", event);
    expect(handleClick).not.toBeCalled();
    expect(event.persist).toBeCalled();
    expect(dd.state().active).toBe(false);
  });

  it("handles change", function() {
    const handleChange = jest.fn();
    const dd = mount(
      <Dropdown
        name="dataDropdown"
        id="dataDropdown"
        options={[
          { text: "Yes", value: "true" },
          { text: "No", value: "false" }
        ]}
        onChange={handleChange}
      />
    );
    dd.find("Option")
      .first()
      .simulate("mousedown");
    expect(handleChange).toBeCalled();
    expect(dd.state().value).toBe("true");
    expect(dd.state().display).toBe("Yes");
    //do it again to check the else branch
    dd.find("Option")
      .first()
      .simulate("mousedown");
    expect(handleChange).toBeCalled();
    expect(dd.state().value).toBe("true");
    expect(dd.state().display).toBe("Yes");
  });

  it("handles options mouseover", function() {
    const dd = mount(
      <Dropdown
        name="dataDropdown"
        id="dataDropdown"
        options={[
          { text: "Yes", value: "true" },
          { text: "No", value: "false" }
        ]}
      />
    );
    dd.find("Option")
      .first()
      .simulate("mouseover");
    expect(dd.state().options[0].props.value).toEqual(
      dd.props().options[0].value
    );
  });

  it("handles change via typing when focused", function() {
    const event = {
      persist: jest.fn(),
      preventDefault: jest.fn(),
      key: "ArrowDown"
    };
    const event2 = {
      persist: jest.fn(),
      preventDefault: jest.fn(),
      key: "ArrowUp"
    };

    const event3 = {
      persist: jest.fn(),
      preventDefault: jest.fn(),
      key: "Enter"
    };

    const handleChange = jest.fn();
    const dd = mount(
      <Dropdown
        name="dataDropdown"
        id="dataDropdown"
        options={[
          { text: "yes", value: "true" },
          { text: "no", value: "false" }
        ]}
        onChange={handleChange}
        valueOnly
      />
    );
    dd.find("input")
      .first()
      .simulate("focus", event);
    dd.find(".textfield").simulate("keydown", event);
    expect(dd.state().active).toBe(true);
    dd.find(".textfield").simulate("keydown", event2);
    expect(dd.state().active).toBe(true);
    dd.find(".textfield").simulate("keydown", event3);
    expect(dd.state().active).toBe(false);
    expect(dd.state().selectedIndex).toBe(1);
    expect(dd.state().value).toBe("false");
    expect(event.persist).toBeCalled();
    expect(event.preventDefault).toBeCalled();
  });
});
