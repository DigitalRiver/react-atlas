import React from "react";
import { mount } from "enzyme";
import { TimerCore } from "../../../react-atlas-core/src/Timer/index";

import renderer from "react-test-renderer";

function myWait(secs) {
  let startTime = new Date();
  let now = new Date();
  while (now - startTime < secs * 1000) {
    now = new Date();
  }
}

describe("Test Timer component render", () => {
  it("Render correctly", () => {
    const tree = renderer
      .create(<TimerCore className={"Class"} time={20} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Testing Timer component", () => {
  it("Timer component - Basic test (remaining secs)", function() {
    jest.useFakeTimers();
    let timer = mount(<TimerCore className={"Class"} time={20} />);
    jest.runTimersToTime(10000);
    expect(timer.state().secondsRemaining).toBe(10);
  });

  it("Timer component - Basic test (ticking)", function() {
    jest.useFakeTimers();
    let timer = mount(<TimerCore className={"Class"} time={20} />);
    for (let i = 1; i <= 10; i++) {
      jest.runTimersToTime(1000);
      expect(timer.state().secondsRemaining).toBe(20 - i);
    }
  });
});
