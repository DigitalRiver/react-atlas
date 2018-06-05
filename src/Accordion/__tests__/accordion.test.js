import React from "react";
import { mount, shallow } from "enzyme";
import { Accordion } from "../index";
import renderer from "react-test-renderer";

describe("Test Accordion component", () => {
  it("Test render correctly", () => {
    const comp = 
      <Accordion>
        <div expanded id>
          Text for first accordion item
        </div>
        <div expanded>Text for second accordion item</div>
        <div expanded>Text for third accordion item</div>
      </Accordion>
    ;
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Test Accordion Component: Basic Tests", () => {
  const accordionComponent = shallow(
    <Accordion>
      <div expanded>Text for first accordion item</div>
      <div expanded>Text for second accordion item</div>
      <div expanded>Text for third accordion item</div>
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

  it("Test width as number", () => {
    const accWidth1 = mount(
      <Accordion width={400}>
        <div title="first">first</div>
        <div title="second">second</div>
      </Accordion>
    );
    expect(accWidth1.props().width).toEqual(400);
  });

  it("Test width as string", () => {
    const accWidth2 = mount(
      <Accordion width="50rem">
        <div title="first">first</div>
        <div title="second">second</div>
      </Accordion>
    );
    expect(accWidth2.props().width).toEqual("50rem");
  });

  it("Test component is disabled", () => {
    const accWidth1 = mount(
      <Accordion disabled>
        <div title="first">first</div>
        <div title="second">second</div>
      </Accordion>
    );
    expect(accWidth1.props().disabled).toBe(true);
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
});

describe("Test Accordion Component: _getExpandedPanels() method", () => {
  const acc = mount(
    <Accordion>
      <div expanded>Text for first accordion item</div>
      <div>Text for second accordion item</div>
      <div>Text for third accordion item</div>
      <div>Text for fourth accordion item</div>
    </Accordion>
  );

  const expectedObj = [true, false, false, false];

  const instance = acc.instance();
  it("Test initial _getExpandedPanels() call", function() {
    const returnObject = instance._getExpandedPanels(acc.props().children);
    expect(returnObject).toEqual(expectedObj);
  });
});
