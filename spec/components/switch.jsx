import React from 'react';
import Switch from '../../components/switch';

class SwitchTest extends React.Component {
  state = {
    switch: [true, false, false]
  };

  handleChange = (index, value) => {
    const state = this.state.switch;
    state[index] = value;
    this.setState({switch: state});
  };

  render () {
    return (
      <section>
        <h5>Switches</h5>
        <p style={{marginBottom: '10px'}}>This is more beautiful than the old fashion checkboxes...</p>
        <Switch/>
      </section>
    );
  }
}

export default SwitchTest;
