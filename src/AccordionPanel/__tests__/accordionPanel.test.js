import React from "react";
import { mount } from "enzyme";
import { AccordionPanel } from "../index";
import { Accordion } from "../../Accordion/index";
import renderer from "react-test-renderer";

describe("Test Accordion Panel component", () => {
  it("Test render correctly", () => {
    const comp = 
      <AccordionPanel title="First">
        Some content for the first panel
      </AccordionPanel>
    ;
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders children", () => {
    const ap = mount(
      <AccordionPanel>
        <span>Some content for the first panel</span>
        <span>Some more content for the first panel</span>
      </AccordionPanel>
    );

    expect(ap.props().children.length).toBe(2);
    expect(ap.props().children[0].type).toBe("span");
    expect(ap.props().children[0].props.children).toBe(
      "Some content for the first panel"
    );
    expect(ap.props().children[1].type).toBe("span");
    expect(ap.props().children[1].props.children).toBe(
      "Some more content for the first panel"
    );
    expect(ap.find("span").length).toBe(2);
  });

  it("renders className", () => {
    const ap = mount(
      <AccordionPanel className="foo">
        <span>Some content for the first panel</span>
        <span>Some more content for the first panel</span>
      </AccordionPanel>
    );

    expect(ap.find(".foo").exists()).toBe(true);
  });

  it("handles expanded", () => {
    const ap = mount(
      <Accordion>
        <AccordionPanel expanded>
          <span>Some content for the first panel</span>
          <span>Some more content for the first panel</span>
        </AccordionPanel>
      </Accordion>
    );

    expect(ap.find(".active").exists()).toBe(true);
  });

  it("is not expanded by default", () => {
    const ap = mount(
      <Accordion>
        <AccordionPanel>
          <span>Some content for the first panel</span>
          <span>Some more content for the first panel</span>
        </AccordionPanel>
      </Accordion>
    );

    expect(ap.find(".active").exists()).toBe(false);
    expect(ap.find(".inactive").exists()).toBe(true);
    expect(ap.find(".header-inactive").exists()).toBe(true);
  });

  it("renders style", () => {
    const ap = mount(
      <AccordionPanel style={{ "color": "red" }}>
        <span>Some content for the first panel</span>
        <span>Some more content for the first panel</span>
      </AccordionPanel>
    );

    expect(ap.props().style).toEqual({ "color": "red" });
  });

  it("renders title", () => {
    const ap = mount(
      <Accordion>
        <AccordionPanel title="First Panel">
          <div>Some content for the first panel</div>
          <div>Some more content for the first panel</div>
        </AccordionPanel>
      </Accordion>
    );
    expect(ap.instance().props.children.props.title).toBe("First Panel");
    expect(ap.find(".accordion_header").props().children).toBe("First Panel");
  });
});
