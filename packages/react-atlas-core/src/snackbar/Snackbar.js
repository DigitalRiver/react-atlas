import React, { Component, PropTypes } from 'react';
import themeable from 'react-themeable';
import Overlay from '../overlay';
import classNames from 'classnames/bind';

class Snackbar extends Component {

  componentDidUpdate () {
    if (this.props.active && this.props.timeout) {
      setTimeout(() => {
        this.props.onTimeout();
      }, this.props.timeout);
    }
  }

  render () {
    const { active, className, ...props } = this.props;

    const theme = themeable(props.theme);
    const classes = classNames({
      root: true,
      active
    }, className);

    return (

        <div {...theme(1, ...classes)}>
            {React.Children.map(this.props.children, (child) => {
                if (typeof child === 'string') {
                    return <span {...theme(1, 'text')}>{child}</span>;
                } else {
                    return child;
                }
            })}
        </div>

    );
  }
}

Snackbar.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    timeout: PropTypes.number,
    onTimeout: PropTypes.func,
    children: PropTypes.node
};

Snackbar.styleguide = {
  category: 'Layout',
  index: '4.6',
  wrappedExample: true,
  example: `
// Internal Methods {
class SnackbarExample extends React.Component {
  state = {
    active: false,
    overlayActive: false
  };

  handleSnackbarClick = () => {
    this.setState({active: false, overlayActive: false});
  };

  handleSnackbarTimeout = () => {
    this.setState({active: false, overlayActive: false});
  };

  handleRegularClick = () => {
    this.setState({active: true});
  };
  handleSnackAndOverlayClick = () => {
    this.setState({overlayActive: true});
  };
// }
  render () {
    return (
      <section>
        <h5>Snackbar Example</h5>
        <p>Regular Snackbar popup</p>
        <Button onClick={this.handleRegularClick}>
          Show snackbar
        </Button>
        <Snackbar
          action="Hide"
          active={this.state.active}
          timeout={20000}
          onTimeout={this.handleSnackbarTimeout}
          type="cancel"
        >
          Snackbar Content
          <Button onClick={this.handleSnackbarClick}>
            Hide
          </Button>
        </Snackbar>

        <p>Snackbar with overlay popup</p>
        <Button onClick={this.handleSnackAndOverlayClick}>
          Overlay and snackbar
        </Button>
        <Overlay active={this.state.overlayActive} opacity={0}>
          <Snackbar
            action="Hide"
            active={this.state.overlayActive}
            timeout={20000}
            onTimeout={this.handleSnackbarTimeout}
            type="cancel"
          >
            Snackbar Content
            <Button onClick={this.handleSnackbarClick}>
              Hide
            </Button>
          </Snackbar>
        </Overlay>
      </section>
    );
  }
// Mount Component {
}
ReactDOM.render(<SnackbarExample/>, mountNode);
// }
`
};

export default Snackbar;
