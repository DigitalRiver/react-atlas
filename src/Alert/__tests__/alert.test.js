import React from "react";
import Alert from "../index";
import renderer from "react-test-renderer";

describe("Test Alert component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Alert type="success">
          <strong>Success!</strong> This alert box indicates a successful or
          positive action.
        </Alert>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
