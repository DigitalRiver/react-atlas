import React from "react";
import { mount, shallow } from "enzyme";
import { Accordion } from "../index";
import { AccordionPanel } from "../../AccordionPanel/index";
import renderer from "react-test-renderer";

describe("Test Accordion component", () => {
  it("Test render correctly", () => {
    const comp = (
      <Accordion>
        <div expanded="true" id>
          Text for first accordion item.
        </div>
        <div expanded="true">Text for second accordion item</div>
        <div expanded="true">Text for third accordion item</div>
      </Accordion>
    );
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test Accordion Component: Basic Tests", () => {
  const accordionComponent = shallow(
    <Accordion>
      <div expanded="true">Text for first accordion item</div>
      <div expanded="true">Text for second accordion item</div>
      <div expanded="true">Text for third accordion item</div>
    </Accordion>
  );

  it("Basic Accordion", () => {
    expect(accordionComponent.exists(<Accordion />)).toBe(true);
  });

  it("Contains No Child", () => {
    const acc = mount(<Accordion />);

    expect(acc.props().children).toBeUndefined();
  });

  it("Contains Child", () => {
    expect(accordionComponent.props()).toHaveProperty("children");
  });

  it("Test Title prop", () => {
    const accTitle = mount(
      <Accordion>
        <div title="first">first</div>
      </Accordion>
    );
    expect(accTitle.props().children.props.title).toBe("first");
  });

  it("Test all expanded", () => {
    expect(accordionComponent.state().activeChildArray[0]).toEqual(true);
    expect(accordionComponent.state().activeChildArray[1]).toEqual(true);
    expect(accordionComponent.state().activeChildArray[2]).toEqual(true);
  });

  it("Test multiOpen function", () => {
    const accMulti = mount(
      <Accordion multiOpen>
        <div title="first">first</div>
        <div title="second">second</div>
      </Accordion>
    );
    expect(accMulti.props().multiOpen).toBe(true);
  });

  it("Test onclick", () => {
    let clicks = 0;
    const updateClicks = function() {
      clicks++;
    };
    const acc = mount(
      <Accordion onClick={updateClicks}>
        <div title="first">first</div>
        <div title="second">second</div>
      </Accordion>
    );
    acc
      .find(".accordion_header")
      .first()
      .simulate("click");
    expect(clicks).toBe(1);
  });

  it("Test onclick when disabled", () => {
    let clicks = 0;
    const updateClicks = function() {
      clicks++;
    };
    const acc = mount(
      <Accordion disabled onClick={updateClicks}>
        <div title="first">first</div>
        <div title="second">second</div>
      </Accordion>
    );
    acc
      .find(".accordion_header")
      .first()
      .simulate("click");
    expect(clicks).toBe(0);
  });

  it("Test only fire onClick when onClick prop exists", () => {
    let clicks = 0;
    const acc = mount(
      <Accordion>
        <div title="first">first</div>
        <div title="second">second</div>
      </Accordion>
    );
    acc
      .find(".accordion_header")
      .first()
      .simulate("click");
    expect(clicks).toBe(0);
  });

  it("mouseEnter sets hover", () => {
    const acc = mount(
      <Accordion>
        <div title="first">first</div>
        <div title="second">second</div>
      </Accordion>
    );
    acc
      .find(".accordion_header")
      .first()
      .simulate("mouseEnter");
    expect(acc.state().hover).toBe(0);
    acc
      .find(".accordion_header")
      .last()
      .simulate("mouseEnter");
    expect(acc.state().hover).toBe(1);
  });

  it("mouseLeave nullifies hover", () => {
    const acc = mount(
      <Accordion>
        <div title="first">first</div>
        <div title="second">second</div>
      </Accordion>
    );
    acc
      .find(".accordion_header")
      .first()
      .simulate("mouseEnter");
    expect(acc.state().hover).toBe(0);
    acc
      .find(".accordion_header")
      .first()
      .simulate("mouseLeave");
    expect(acc.state().hover).toBe(null);
  });

  it("expandAll click expands all", () => {
    const acc = mount(
      <Accordion expandAll>
        <div title="first">first</div>
        <div title="second">second</div>
      </Accordion>
    );
    acc.find(".expandAll").simulate("click");
    expect(acc.state().activeChildArray).toEqual([true, true]);
  });

  it("Test component is disabled", () => {
    const accDisabled = mount(
      <Accordion disabled>
        <div title="first">first</div>
        <div title="second">second</div>
      </Accordion>
    );
    accDisabled._setActiveChildArray = jest.fn();
    expect(accDisabled.props().disabled).toBe(true);
    accDisabled.simulate("click");
    expect(accDisabled._setActiveChildArray).not.toBeCalled();
  });

  it("Test TitlePosition is centered", () => {
    const accWidth2 = mount(
      <Accordion titlePosition="center">
        <div title="first">first</div>
        <div title="second">second</div>
      </Accordion>
    );
    expect(accWidth2.props().titlePosition).toEqual("center");
  });
});

describe("Test Accordion Component: Test _setActiveChildArray() method", () => {
  const acc = mount(
    <Accordion>
      <div>Text for first accordion item</div>
      <div>Text for second accordion item</div>
      <div>Text for third accordion item</div>
      <div>Text for fourth accordion item</div>
    </Accordion>
  );
  const instance = acc.instance();

  it("Test initial _setActiveChildArray() call", function() {
    const expectedObj = [false, false, false, false];
    const returnObject = instance._setActiveChildArray(
      acc.state().activeChildArray,
      false,
      false
    );
    expect(returnObject).toEqual(expectedObj);
  });

  it("Test _setActiveChildArray expandAll call", function() {
    const expectedObj = [true, true, true, true];
    const returnObject = instance._setActiveChildArray(
      acc.state().activeChildArray,
      true
    );
    expect(returnObject).toEqual(expectedObj);
  });

  it("Test _setActiveChildArray _click call", function() {
    const expectedObj = [false, false, false, true];
    const returnObject = instance._setActiveChildArray(
      acc.state().activeChildArray,
      false,
      3
    );
    expect(returnObject).toEqual(expectedObj);
  });

  it("Test _setActiveChildArray _click call then recall _click with a different index", function() {
    const expectedObj = [false, false, false, true];
    const expectedSecondObj = [false, false, true, false];
    const returnObject = instance._setActiveChildArray(
      acc.state().activeChildArray,
      false,
      3
    );
    expect(returnObject).toEqual(expectedObj);
    const returnSecondObject = instance._setActiveChildArray(
      acc.state().activeChildArray,
      false,
      2
    );
    expect(returnSecondObject).toEqual(expectedSecondObj);
  });

  it("Test _setActiveChildArray _click call with multiOpen", function() {
    const accMulti = mount(
      <Accordion multiOpen>
        <div>Text for first accordion item</div>
        <div>Text for second accordion item</div>
        <div>Text for third accordion item</div>
        <div>Text for fourth accordion item</div>
      </Accordion>
    );
    const instanceMulti = accMulti.instance();
    const expectedObj = [false, false, true, true];
    let returnObject = instanceMulti._setActiveChildArray(
      acc.state().activeChildArray,
      false,
      3
    );
    returnObject = instanceMulti._setActiveChildArray(returnObject, false, 2);
    expect(returnObject).toEqual(expectedObj);
  });

  it("Test _setActiveChildArray _click call then _click same index again to collapse", function() {
    const expectedObj = [false, false, false, true];
    const expectedCollapsedObj = [false, false, false, false];
    let returnObject = instance._setActiveChildArray(
      acc.state().activeChildArray,
      false,
      3
    );
    expect(returnObject).toEqual(expectedObj);
    returnObject = instance._setActiveChildArray(returnObject, false, 3);
    expect(returnObject).toEqual(expectedCollapsedObj);
  });

  it("CWRP updates active child array if props.children is different", function() {
    const newChildren = [
      `<div expanded="false">Text for first accordion item</div>`,
      `<div expanded="true">Text for second accordion item</div>`,
      `<div expanded="false">Text for third accordion item</div>`
    ];

    instance._getExpandedPanels = jest.fn().mockImplementation(() => {
      return [false, true, false];
    });
    instance.UNSAFE_componentWillReceiveProps({ children: newChildren });
    expect(instance._getExpandedPanels).toBeCalled();
    expect(acc.state().activeChildArray).toEqual([false, true, false]);
  });
});

describe("Test Accordion Component: _getExpandedPanels() method", () => {
  const acc = mount(
    <Accordion>
      <div expanded="true">Text for first accordion item</div>
      <AccordionPanel expanded>Text for second accordion item</AccordionPanel>
      <div>Text for third accordion item</div>
      <div>Text for fourth accordion item</div>
    </Accordion>
  );

  const expectedObj = [true, true, false, false];

  const instance = acc.instance();
  it("Test initial _getExpandedPanels() call", function() {
    const returnObject = instance._getExpandedPanels(acc.props().children);
    expect(returnObject).toEqual(expectedObj);
  });
});
