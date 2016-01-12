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
        <h5>Toggle Switches</h5>
        <p style={{marginBottom: '10px'}}></p>
        <Switch />

        <h5>Toggle Switch Colors</h5>

        <span>On Switch Color</span>
        <p style={{marginBottom: '10px'}}></p>
        <Switch onColor="black"/>

        <span>Off Switch Color</span>
        <p style={{marginBottom: '10px'}}></p>
        <Switch offColor="black"/>

        <span>Button Switch Color</span>
        <p style={{marginBottom: '10px'}}></p>
        <Switch buttonColor='black'/>

        <h5>Disabled</h5>
        <p style={{marginBottom: '10px'}}></p>
        <Switch disabled/>

        <h5>Switch sizes</h5>
        <span>Small</span>
        <p style={{marginBottom: '10px'}}></p>
        <Switch small/>


        <span>Medium</span>
        <Switch medium checked />

        <span>Large</span>
        <p style={{marginBottom: '10px'}}></p>
        <Switch large/>
      </section>
    );
  }
}

export default SwitchTest;
