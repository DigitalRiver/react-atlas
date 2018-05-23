import React from "react";
import { mount } from "enzyme";
import DatePicker from "../index";

import renderer from "react-test-renderer";

describe("DatePicker Test suite", () => {
  it("DatePicker - Basic test", function() {
    const dp = mount(<DatePicker />);
    expect(dp).toMatchSnapshot();
  });

  it("DatePicker - Basic test (selected)", function() {
    const dp = mount(<DatePicker selected={"2017-11-29"} />);
    expect(dp.props().selected).toBe("2017-11-29");
  });

  it("DatePicker - change & refresh component", function() {
    const dp = mount(<DatePicker selected={"2017-11-29"} />);
    dp.update();
  });

  it("DatePicker - Correct render test", function() {
    const tree = renderer
      .create(<DatePicker selected={"2017-11-29"} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  /*  This test is commented out until the "event not defined" issue is solved.
  it("DatePicker - Change event test ", function() {
    const dp = shallow(<DatePicker selected={"2017-11-29"} onChange={(date)=>console.log("[INFO] onChange function triggered")}/>);
    let expectedValue = moment("2017-11-29");
    
    expect(dp.state().startDate.isSame(expectedValue)).toBe(true);
    
    let newValue = moment();
    dp.simulate('change', newValue);
    expect(dp.state().startDate.isSame(newValue)).toBe(true);
  });
  */
});
