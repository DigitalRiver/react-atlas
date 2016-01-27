import React from 'react';
import Button from '../../components/button';
import Dialog from '../../components/dialog';

class DialogTest extends React.Component {
  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({
      active: !this.state.active
    });
  };

  render () {
    return (
      <section>
        <h5>Dialog</h5>
        <p>lorem ipsum...</p>
        <Button primary onClick={this.handleToggle}>Show Dialog</Button>
        <Dialog
          active={this.state.active}
          onOverlayClick={this.handleToggle}
        >
          <h6><strong>Use Google's location service?</strong></h6>
          <p>Let Google help apps <strong>determine location</strong>. This means sending anonymous location data to Google, even when no apps are running.</p>

          <Button primary onClick={this.handleToggle}>Disagree</Button>
          <Button primary onClick={this.handleToggle}>Agree</Button>
        </Dialog>
      </section>
    );
  }
}

export default DialogTest;
