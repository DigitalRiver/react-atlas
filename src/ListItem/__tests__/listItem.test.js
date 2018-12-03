import React from "react";
import { mount } from "enzyme";
import { ListItem } from "../index";
import renderer from "react-test-renderer";

describe("Test ListGroup component", () => {
  it("Test render correctly", () => {
    const comp = <ListItem>Item one</ListItem>;
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders children", () => {
    const li = mount(<ListItem>Item one</ListItem>);
    expect(li.text()).toBe("Item one");
  });

  it("renders className", () => {
    const li = mount(<ListItem className="myClass">Item one</ListItem>);
    expect(
      li
        .children()
        .first()
        .html()
    ).toContain("myClass");
    expect(li.find(".myClass").exists()).toBe(true);
  });

  it("sets id attribute", () => {
    const li = mount(
      <ListItem className="myClass" id="itemOne">
        Item one
      </ListItem>
    );

    expect(li.find('[id="itemOne"]').exists()).toBe(true);
  });

  it("renders leftItem", () => {
    const leftItem = `<div id="myLeftItem">left</div>`;
    const li = mount(
      <ListItem className="myClass" id="itemOne" leftItem={leftItem}>
        Item one
      </ListItem>
    );

    expect(li.html()).toContain("myLeftItem");
  });

  it("handles click", () => {
    const handleClick = jest.fn();
    const li = mount(
      <ListItem className="myClass" id="itemOne" onClick={handleClick}>
        Item one
      </ListItem>
    );

    li.simulate("click");
    expect(handleClick).toBeCalled();
  });

  it("renders rightItem", () => {
    const rightItem = `<div id="myRightItem">left</div>`;
    const li = mount(
      <ListItem className="myClass" id="itemOne" rightItem={rightItem}>
        Item one
      </ListItem>
    );

    expect(li.html()).toContain("myRightItem");
  });

  it("sets inline style", () => {
    const li = mount(
      <ListItem className="myClass" id="itemOne" style={{ "color": "red" }}>
        Item one
      </ListItem>
    );

    expect(
      li
        .children()
        .first()
        .html()
    ).toContain('style="color: red;"');
  });
});
