import React from "react";
import { mount } from "enzyme";
import { Timer } from "../index";

import renderer from "react-test-renderer";

describe("Test Timer component render", () => {
  it("Render correctly", () => {
    const tree = renderer
      .create(<Timer className={"Class"} time={20} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing Timer component", () => {
  it("Timer component - Basic test (remaining secs)", function() {
    jest.useFakeTimers();
    let timer = mount(<Timer className={"Class"} time={20} />);
    jest.runTimersToTime(10000);
    expect(timer.state().secondsRemaining).toBe(10);
  });

  it("Timer component - Basic test (ticking)", function() {
    jest.useFakeTimers();
    let timer = mount(<Timer className={"Class"} time={20} />);
    for (let i = 1; i <= 10; i++) {
      jest.runTimersToTime(1000);
      expect(timer.state().secondsRemaining).toBe(20 - i);
    }
  });
});
