import React from "react";
import { mount } from "enzyme";
import { Timer } from "../index";

import renderer from "react-test-renderer";

describe("Timer Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("Counts down", () => {
    let timer = mount(<Timer className={"Class"} time={20} />);
    jest.advanceTimersByTime(10000);
    expect(timer.state().secondsRemaining).toBe(10);
  });

  it("Ticks each second", () => {
    let timer = mount(<Timer className={"Class"} time={20} />);
    for (let i = 1; i <= 10; i++) {
      jest.advanceTimersByTime(1000);
      expect(timer.state().secondsRemaining).toBe(20 - i);
    }
  });

  it("Can reach 0", () => {
    let timer = mount(<Timer time={10} />);
    jest.advanceTimersByTime(10 * 1000);
    expect(timer.state().secondsRemaining).toBe(0);
  });

  it("Stops when it reaches 0", () => {
    let timer = mount(<Timer time={10} />);
    jest.advanceTimersByTime(10 * 1000);
    expect(timer.state().secondsRemaining).toBe(0);
    jest.advanceTimersByTime(2 * 1000);
    expect(timer.state().secondsRemaining).toBe(0);
  });

  it("Triggers callback on reaching 0", () => {
    const callback = jest.fn();
    mount(<Timer time={10} onZero={callback} />);
    jest.advanceTimersByTime(10 * 1000);
    expect(callback).toBeCalled();
  });

  it("Triggers callback onTick", () => {
    const callback = jest.fn();
    mount(<Timer time={10} onTick={callback} />);
    jest.advanceTimersByTime(5 * 1000);
    expect(callback).toHaveBeenCalledTimes(5);
  });

  it("Triggers callback onTick but not on zero", () => {
    const onTick = jest.fn();
    const onZero = jest.fn();
    mount(<Timer time={10} onTick={onTick} onZero={onZero} />);
    jest.advanceTimersByTime(10 * 1000);
    expect(onTick).toHaveBeenCalledTimes(9);
    expect(onZero).toBeCalled();
  });

  it("Loops if it should", () => {
    let timer = mount(<Timer time={3} loop />);
    jest.advanceTimersByTime(2 * 1000);
    expect(timer.state().secondsRemaining).toBe(1);
    jest.advanceTimersByTime(1 * 1000);
    expect(timer.state().secondsRemaining).toBe(3);
  });

  it("Resets time if the time prop changes", () => {
    let timer = mount(<Timer time={5} />);
    jest.advanceTimersByTime(2 * 1000);
    expect(timer.state().secondsRemaining).toBe(3);
    timer.setProps({ time: 10 });
    expect(timer.state().secondsRemaining).toBe(10);
  });

  it("Doesn't tick if there's no time", () => {
    const callback = jest.fn();
    mount(<Timer onTick={callback} />);
    jest.advanceTimersByTime(2 * 1000);
    expect(callback).not.toBeCalled();
  });

  it("Doesn't tick if time is 0", () => {
    const callback = jest.fn();
    mount(<Timer time={0} onTick={callback} />);
    jest.advanceTimersByTime(2 * 1000);
    expect(callback).not.toBeCalled();
  });

  it("stops on unmount", () => {
    const timer = mount(<Timer time={0} />);
    jest.spyOn(window, "clearInterval").mockImplementationOnce(() => {
      return;
    });

    timer.unmount();
    expect(window.clearInterval).toBeCalled();
  });

  it("Supports render prop", () => {
    const tree = renderer
      .create(
        <Timer
          time={10}
          render={remaining => <span>You have {remaining} second(s) left</span>}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
