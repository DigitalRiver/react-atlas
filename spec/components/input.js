import React from "react";
import Input from "../../components/input";
import { Button } from "../../components/button";

class InputTest extends React.Component {
  state = {
    normal: "Tony Stark",
    fixedLabel: "",
    withIcon: ""
  };

  handleChange = (name, value) => {
    const newState = {};
    newState[[name]] = value;
    this.setState(newState);
  };

  render () {
    return (
      <section>
        <h5>Inputs</h5>
        <p>lorem ipsum...</p>
        <Input
          type="text"
          label="First Label" onChange={this.handleChange.bind(this, "normal")}
          maxLength={12}
          placeholder="First Label placeholder"
        />
        <Input
          type="text"
          label="Second Label" onChange={this.handleChange.bind(this, "normal")}
          maxLength={12}
          placeholder="Second Label placeholder"
        />

        <Button style={{"margin": "0 5px"}}>Submit</Button>
      </section>
    );
  }
}

export default InputTest;
