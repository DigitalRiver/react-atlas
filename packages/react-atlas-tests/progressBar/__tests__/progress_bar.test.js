import React from "react";
import { mount } from "enzyme";
import { ProgressBarCore } from "react-atlas-core";
// import style from '../../progress_bar/style';

describe("#calculateRatio", function() {
  let progressBar = mount(<ProgressBarCore min={100} max={300} />);

  // it("calculates the right ratio", function() {
  //   expect(progressBar.calculateRatio(150)).to.equal(0.25);
  // });

  // it("gets 0 when value is less than min", function() {
  //   expect(progressBar.calculateRatio(10)).to.equal(0);
  // });

  // it("gets 1 when value is more than max", function() {
  //   expect(progressBar.calculateRatio(400)).to.equal(1);
  // });

  // it("renders the value and buffer bars when it is linear", function() {
  //   expect(wrapper.props.children.length).to.equal(2);
  //   expect(wrapper.props.children[0].ref).to.equal('buffer');
  //   expect(wrapper.props.children[1].ref).to.equal('value');
  // });

  // it("renders the value and buffer bars when it is linear", function() {
  //   buffer = (progressBar.props.children.props.children[0]);
  //   value = (progressBar.props.children.props.children[1]);
  //   expect(buffer.props.style.transform).to.equal(`scaleX(${0.6})`);
  //   expect(value.props.style.transform).to.equal(`scaleX(${0.3})`);
  // });

  // it("renders the svg circle when it is circular", function() {
  //   // expect(progressBar.props.children.type).to.equal('svg');
  //   // expect(progressBar.props.children.props.children.type).to.equal('circle');
  // });

  // it(
  //   "renders the proper circle length style when it is circular and determinate",
  //   function() {
  //     // circle = progressBar.props.children.props.children;
  //     // strokeLength = 2 * Math.PI * circle.props.r * 0.3;
  //     // expect(circle.props.style.strokeDasharray).to.equal(`${strokeLength}, 400`);
  //   }
  // );

  it("contains mode and className in its className", function() {
    // expect(progressBar.props.className).toContain(style.determinate);
    // expect(progressBar.props.className).toContain(style.tight);
  });
});
