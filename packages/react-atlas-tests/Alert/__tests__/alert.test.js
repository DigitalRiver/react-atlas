import React from "react";
import { AlertCore } from "../../../react-atlas-core/src/Alert/index";
import renderer from "react-test-renderer";

describe("Test Alert component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <AlertCore type="success">
          <strong>Success!</strong> This alert box indicates a successful or
          positive action.
        </AlertCore>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
