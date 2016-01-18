import React, { Component } from 'react';
import { RadioGroup, Radio } from "../../components/radio";
import Overlay from "../../components/overlay"

class RadioGroupTest extends Component {
  state = {
    value: "vvendetta"
  };

  handleChange = (value) => {
    console.log("Changed!", { comic: value});
    this.setState({value});
  };

  handleFocus = () => {
    console.log("Focused V for a Vendetta");
  };

  handleBlur = () => {
    console.log("Blurred Watchmen");
  };

  render () {
    return (
      <section>
        <h5>Radio Button</h5>
        <p style={{marginBottom: "10px"}}>Lorem ipsum...</p>

        <RadioGroup name="comic">
          <Radio label="The Walking Dead" value="thewalkingdead" defaultChecked />
          <Radio label="From Hell" value="fromhell" disabled/>
          <Radio label="V for a Vendetta" value="vvendetta" className="someClassIMadeUp" inline onFocus={this.handleFocus}/>
          <Radio label="Watchmen" value="watchmen" inline onBlur={this.handleBlur}/>
        </RadioGroup>
      </section>
    );
  }
}

export default RadioGroupTest;
