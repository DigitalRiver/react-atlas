import React from "react";
import Input from "../../components/input";
import Checkbox from "../../components/checkbox";

class CheckboxTest extends React.Component {
  state = {
    checkbox_1: true,
    checkbox_2: false,
    checkbox_3: true
  };

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleFocus = () => {
    console.log("Focused");
  };

  handleBlur = () => {
    console.log("Blur");
  };

  render () {
    return (
      <section>
        <h5>Checkbox</h5>
        <p style={{marginBottom: "10px"}}>Checkbox Component checkboxes (...except that last one there)</p>

        <Checkbox
          defaultChecked={this.state.checkbox_1}
          label="Checked checkbox"
          onChange={this.handleChange.bind(this, "checkbox_1")}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Checkbox
          defaultChecked={this.state.checkbox_2}
          label="Not checked"
          onChange={this.handleChange.bind(this, "checkbox_2")}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Checkbox
          defaultChecked={this.state.checkbox_3}
          label="Disabled checkbox"
          disabled
          onChange={this.handleChange.bind(this, "checkbox_3")}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />

        <Input type="checkbox" label="Input Component checkbox" />
      </section>
    );
  }
}

export default CheckboxTest;
