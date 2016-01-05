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
        <h5>Switches Small</h5>
        <p style={{marginBottom: '10px'}}></p>
        <Switch small/>


        <h5>Switches Medium</h5>
        <p style={{marginBottom: '10px'}}></p>
        <Switch medium/>


        <h5>Switches Large</h5>
        <p style={{marginBottom: '10px'}}></p>
        <Switch large/>
      </section>
    );
  }
}

export default SwitchTest;
