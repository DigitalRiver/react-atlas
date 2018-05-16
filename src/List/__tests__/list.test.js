import React from "react";
import { mount } from "enzyme";
import { List } from "../index";
import { ListGroup } from "../../ListGroup/index";
import { ListItem } from "../../ListItem/index";
import { Avatar } from "../../Avatar/index";
import { Switch } from "../../Switch/index";
import { Button } from "../../Button/index";
import renderer from "react-test-renderer";

describe("Test List component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <List border>
          <ListGroup title="Dinosaurs">
            <ListItem leftItem={<Avatar title="Blue" />} rightItem={<Switch />}>
              <Button link>Blue</Button>
            </ListItem>
            <ListItem leftItem={<Avatar title="Earl" />} rightItem={<Switch />}>
              <Button link>Earl Sinclair</Button>
            </ListItem>
          </ListGroup>
        </List>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
