import React from "react";
import { mount } from "enzyme";
import { ListCore } from "../../../react-atlas-core/src/List/index";
import { ListGroupCore } from "../../../react-atlas-core/src/ListGroup/index";
import { ListItemCore } from "../../../react-atlas-core/src/ListItem/index";
import { AvatarCore } from "../../../react-atlas-core/src/Avatar/index";
import { SwitchCore } from "../../../react-atlas-core/src/Switch/index";
import { ButtonCore } from "../../../react-atlas-core/src/Button/index";
import renderer from "react-test-renderer";

describe("Test List component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ListCore border>
          <ListGroupCore title="Dinosaurs">
            <ListItemCore
              leftItem={<AvatarCore title="Blue" />}
              rightItem={<SwitchCore />}
            >
              <ButtonCore link>Blue</ButtonCore>
            </ListItemCore>
            <ListItemCore
              leftItem={<AvatarCore title="Earl" />}
              rightItem={<SwitchCore />}
            >
              <ButtonCore link>Earl Sinclair</ButtonCore>
            </ListItemCore>
          </ListGroupCore>
        </ListCore>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
