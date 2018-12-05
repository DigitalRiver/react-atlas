import React from "react";
import { mount } from "enzyme";
import { ListGroup } from "../index";
import renderer from "react-test-renderer";

describe("Test ListGroup component", () => {
  it("Test render correctly", () => {
    const comp = 
      <ListGroup groupTitle="My List">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ListGroup>
    ;
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders children", () => {
    const lg = mount(
      <ListGroup title="My List">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ListGroup>
    );
    expect(
      lg
        .children()
        .first()
        .children().length
    ).toBe(4); // title + 3 items
    expect(lg.html()).toContain("<div>Item 1</div>");
    expect(lg.html()).toContain("<div>Item 2</div>");
    expect(lg.html()).toContain("<div>Item 3</div>");
  });

  it("renders className", () => {
    const lg = mount(
      <ListGroup title="My List" className="myClass">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ListGroup>
    );
    expect(
      lg
        .children()
        .first()
        .html()
    ).toContain("myClass");
    expect(lg.find(".myClass").exists()).toBe(true);
  });

  it("adds divider class by default", () => {
    const lg = mount(
      <ListGroup title="My List" className="myClass">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ListGroup>
    );

    expect(lg.find(".divider").exists()).toBe(true);
  });

  it("omits divider class when divider is false", () => {
    const lg = mount(
      <ListGroup title="My List" className="myClass" divider={false}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ListGroup>
    );

    expect(lg.find(".divider").exists()).toBe(false);
  });

  it("sets id attribute", () => {
    const lg = mount(
      <ListGroup title="My List" className="myClass" id="myList">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ListGroup>
    );

    expect(lg.find('[id="myList"]').exists()).toBe(true);
  });

  it("sets inline style", () => {
    const lg = mount(
      <ListGroup title="My List" className="myClass" style={{ "color": "red" }}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ListGroup>
    );

    expect(
      lg
        .children()
        .first()
        .html()
    ).toContain('style="color: red;"');
  });

  it("renders title", () => {
    const lg = mount(
      <ListGroup title="My List" className="myClass">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ListGroup>
    );

    expect(
      lg
        .children()
        .first()
        .children()
        .first()
        .text()
    ).toBe("My List");
  });
});
