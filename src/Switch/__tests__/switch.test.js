import React from "react";
import { mount } from "enzyme";
import { Switch } from "../index";

import renderer from "react-test-renderer";

describe("Test switch component render", () => {
  it("Render correctly", () => {
    const tree = renderer
      .create(
        <Switch
          className={"Class"}
          disabled={false}
          hidden={false}
          checked={false}
          name={"Name"}
          id={"ID"}
          onColor={"black"}
          onClick={() => {}}
          offColor={"white"}
          buttonColor={"grey"}
          small={false}
          medium
          large={false}
          onChange={() => {}}
          onBeforeChange={() => {}}
          inline={false}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing switch component", () => {
  it("Change Props", () => {
    const swich = mount(
      <Switch
        className={"Class"}
        disabled={false}
        hidden={false}
        checked={false}
        name={"Name"}
        id={"ID"}
        onColor={"black"}
        onClick={() => {}}
        offColor={"white"}
        buttonColor={"grey"}
        small={false}
        medium
        large={false}
        onChange={() => {}}
        onBeforeChange={() => {}}
        inline={false}
      />
    );

    swich.setProps({ name: "NewName" });

    swich.setProps({ checked: true });
    expect(swich.state().checked).toEqual(true);

    swich.setProps({ disabled: true });
    expect(swich.state().disabled).toEqual(true);
  });

  it("buttonColor applies", () => {
    const swich = mount(<Switch buttonColor="red" />);
    expect(swich.find(".handleEnabledColor").html()).toContain(
      "background: red;"
    );
  });

  it("className applies", () => {
    const swich = mount(<Switch className="myClass" />);
    console.log(swich.html());
    expect(swich.find(".myClass").exists()).toBe(true);
  });

  it("disabled applies", () => {
    const swich = mount(<Switch disabled />);
    expect(swich.find("input").props().disabled).toBe(true);
  });

  it("hidden applies hidden class to div surrounding input", () => {
    const swich = mount(<Switch hidden />);
    expect(swich.find(".hidden").exists()).toBe(true);
  });

  it("id applies", () => {
    const swich = mount(<Switch id="myId" />);
    expect(swich.html()).toContain('id="myId"');
  });

  it("inline applies", () => {
    const swich = mount(<Switch inline />);
    expect(swich.find(".inline").exists()).toBe(true);
  });

  it("label applies", () => {
    const swich = mount(<Switch label="mySwitch" />);
    expect(swich.find("label").exists()).toBe(true);
    expect(swich.find("label").text()).toBe("mySwitch");
  });

  it("leftLabel applies", () => {
    const swich = mount(<Switch leftLabel label="mySwitch" />);
    expect(swich.find(".leftLabelContent").exists()).toBe(true);
  });

  it("name applies", () => {
    const swich = mount(<Switch name="mySwitch" />);
    expect(swich.find("input").props().name).toBe("mySwitch");
  });

  it("onColor applies", () => {
    const swich = mount(<Switch offColor="blue" onColor="purple" />);
    expect(swich.find(".onColorMedium").props().style).toEqual({
      background: "purple"
    });
  });

  it("Small switch applies small class", () => {
    const swich = mount(<Switch small />);

    expect(swich.find(".sliderSmall").exists()).toBe(true);
  });

  it("Medium switch by default", () => {
    const swich = mount(<Switch />);

    expect(swich.find(".sliderMedium").exists()).toBe(true);
  });

  it("Large switch applies large class", () => {
    const swich = mount(<Switch large />);
    expect(swich.find(".sliderLarge").exists()).toBe(true);
  });

  it("onClick does not run when disabled", () => {
    const handleClick = jest.fn();
    const swich = mount(<Switch disabled onClick={handleClick} />);
    swich.find("input").simulate("click");
    expect(handleClick).not.toBeCalled();
    expect(swich.state().checked).toBe(false);
  });

  it("onClick", () => {
    const handleClick = jest.fn();
    const swich = mount(<Switch onClick={handleClick} />);
    swich.find("input").simulate("click");
    expect(handleClick).toBeCalled();
    expect(swich.state().checked).toBe(true);
  });

  it("onChange", () => {
    const handleChange = jest.fn();
    const swich = mount(<Switch onChange={handleChange} />);
    swich.find("input").simulate("click");
    expect(handleChange).toBeCalled();
    expect(swich.state().checked).toBe(true);
  });

  it("onBeforeChange", () => {
    const handleBeforeChange = jest.fn();
    const swich = mount(<Switch onBeforeChange={handleBeforeChange} />);
    swich.find("input").simulate("click");
    expect(handleBeforeChange).toBeCalled();
  });

  it("onBeforeChange can be used to prevent state change of checked", () => {
    const handleChange = jest.fn();
    const handleClick = jest.fn();
    const handleBeforeChange = jest.fn().mockImplementation(() => false);
    const swich = mount(
      <Switch
        onBeforeChange={handleBeforeChange}
        onClick={handleClick}
        onChange={handleChange}
      />
    );
    swich.find("input").simulate("click");
    expect(handleBeforeChange).toBeCalled();
    expect(swich.state().checked).toBe(false);
  });
});
