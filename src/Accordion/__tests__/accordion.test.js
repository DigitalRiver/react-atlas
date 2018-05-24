import React from "react";
import { mount } from "enzyme";
import { Accordion } from "../index";
import renderer from "react-test-renderer";

describe("Test correct render", () => {
  it("Test correct render", function() {
    const accordion = 
      <Accordion>
        <div title="First">Text for first accordion item</div>
        <div title="Second">Text for second accordion item</div>
      </Accordion>
    ;
    const tree = renderer.create(accordion).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Test all expanded", () => {
    const acc = mount(
      <Accordion>
        <div>Text for first accordion item</div>
        <div expanded>Text for second accordion item</div>
        <div>Text for third accordion item</div>
      </Accordion>
    );
    expect(acc.state().activeChildArray[0]).toEqual(false);
    expect(acc.state().activeChildArray[1]).toEqual(true);
    expect(acc.state().activeChildArray[2]).toEqual(false);
  });

  // it("Test expand one with all collapsed", () => {
  //   const acc = mount(
  //     <Accordion>
  //       <div title="first">first</div>
  //       <div title="second">second</div>
  //     </Accordion>
  //   );
  //   acc
  //     .find("div")
  //     .forEach(
  //       n => n.props().children === "first" ? n.simulate("click") : null
  //     );
  //   expect(acc.state().activeChildArray[0]).toEqual(true);
  //   expect(acc.state().activeChildArray[1]).toEqual(false);
  // });

  // it("Test switch from one expanded to another expanded", () => {
  //   const acc = mount(
  //     <Accordion>
  //       <div title="first">first</div>
  //       <div title="second">second</div>
  //     </Accordion>
  //   );
  //   acc
  //     .find("div")
  //     .forEach(
  //       n => n.props().children === "first" ? n.simulate("click") : null
  //     );
  //   expect(acc.state().activeChildArray[0]).toEqual(true);
  //   expect(acc.state().activeChildArray[1]).toEqual(false);
  //   acc
  //     .find("div")
  //     .forEach(
  //       n => n.props().children === "second" ? n.simulate("click") : null
  //     );
  //   expect(acc.state().activeChildArray[0]).toEqual(false);
  //   expect(acc.state().activeChildArray[1]).toEqual(true);
  // });

  // it("Test switch from one expanded to another expanded II", () => {
  //   const acc = mount(
  //     <Accordion>
  //       <div title="first">first</div>
  //       <div title="second" expanded>
  //         second
  //       </div>
  //     </Accordion>
  //   );
  //   expect(acc.state().activeChildArray[0]).toEqual(false);
  //   expect(acc.state().activeChildArray[1]).toEqual(true);
  //   acc
  //     .find("div")
  //     .forEach(
  //       n => n.props().children === "first" ? n.simulate("click") : null
  //     );
  //   expect(acc.state().activeChildArray[0]).toEqual(true);
  //   expect(acc.state().activeChildArray[1]).toEqual(false);
  // });

  // it("Test expand one, collapse then same (all collapsed)", () => {
  //   const acc = mount(
  //     <Accordion>
  //       <div title="first">first</div>
  //       <div title="second">second</div>
  //     </Accordion>
  //   );
  //   acc
  //     .find("div")
  //     .forEach(
  //       n => n.props().children === "first" ? n.simulate("click") : null
  //     );
  //   expect(acc.state().activeChildArray[0]).toEqual(true);
  //   expect(acc.state().activeChildArray[1]).toEqual(false);

  //   acc
  //     .find("div")
  //     .forEach(
  //       n => n.props().children === "first" ? n.simulate("click") : null
  //     );
  // });

  // it("Test expand two, multiOpen (all collapsed)", () => {
  //   const acc = mount(
  //     <Accordion multiOpen>
  //       <div title="first">first</div>
  //       <div title="second">second</div>
  //     </Accordion>
  //   );
  //   acc
  //     .find("div")
  //     .forEach(
  //       n => n.props().children === "first" ? n.simulate("click") : null
  //     );
  //   expect(acc.state().activeChildArray[0]).toEqual(true);
  //   expect(acc.state().activeChildArray[1]).toEqual(false);
  //   acc
  //     .find("div")
  //     .forEach(
  //       n => n.props().children === "second" ? n.simulate("click") : null
  //     );
  //   expect(acc.state().activeChildArray[0]).toEqual(true);
  //   expect(acc.state().activeChildArray[1]).toEqual(true);

  //   acc
  //     .find("div")
  //     .forEach(
  //       n => n.props().children === "first" ? n.simulate("click") : null
  //     );
  //   expect(acc.state().activeChildArray[0]).toEqual(false);
  //   expect(acc.state().activeChildArray[1]).toEqual(true);
  //   acc
  //     .find("div")
  //     .forEach(
  //       n => n.props().children === "second" ? n.simulate("click") : null
  //     );
  // });

  // it("Test expand all by clicking expandAll link", () => {
  //   const acc = mount(
  //     <Accordion expandAll>
  //       <div>Text for first accordion item</div>
  //       <div>Text for second accordion item</div>
  //       <div>Text for third accordion item</div>
  //       <div>Text for fourth accordion item</div>
  //     </Accordion>
  //   );

  //   acc
  //     .find("div")
  //     .forEach(
  //       n => n.props().children === "Expand All" ? n.simulate("click") : null
  //     );

  //   expect(acc.state().activeChildArray[0]).toEqual(true);
  //   expect(acc.state().activeChildArray[1]).toEqual(true);
  //   expect(acc.state().activeChildArray[2]).toEqual(true);
  //   expect(acc.state().activeChildArray[3]).toEqual(true);
  // });
});
