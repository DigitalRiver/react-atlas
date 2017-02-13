import React from 'react';
import { classNames } from '../utils';
import Overlay from '../overlay';
import themeable from 'react-themeable';

const Drawer = ({active, className, type, onOverlayClick, ...props}) => {
  const theme = themeable(props.theme);
  const classes = classNames({
    container: true,
    left: type == 'left',
    right: type == 'right',
    active
  }, className);

  return (
    <Overlay active={active} onClick={onOverlayClick}>
      <div {...theme(1, ...classes)}>
        <aside>
          {props.children}
        </aside>
      </div>
    </Overlay>
  );
};

Drawer.propTypes = {
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  onOverlayClick: React.PropTypes.func,
  type: React.PropTypes.oneOf(['left', 'right'])
};

Drawer.defaultProps = {
  active: false,
  className: '',
  type: 'left',
  theme: {
    'container': true
  }
};

Drawer.styleguide = {
  category: 'Navigation',
  index: '5.1',
  wrappedExample: true,
  example: `
// Internal Methods {
class DrawerTest extends React.Component {
  state = {
    leftActive: false,
    rightActive: false
  };

  handleToggleLeft = () => {
    this.setState({leftActive: !this.state.leftActive});
  };

  handleToggleRight = () => {
    this.setState({rightActive: !this.state.rightActive});
  };

  render () {
// }
    return (
      <section>
        <h5>Drawer</h5>
        <p>You can navigate using a drawer to the left or right.</p>

        <Drawer active={this.state.leftActive} onOverlayClick={this.handleToggleLeft}>
          <h5>Officia deserunt mollit.</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Drawer>

        <Drawer active={this.state.rightActive} type="right">
          <Button onClick={this.handleToggleRight}>Close</Button>
        </Drawer>

        <nav>
          <Button onClick={this.handleToggleLeft}>Drawer left</Button>
          <Button outline onClick={this.handleToggleRight}>Drawer right</Button>
        </nav>
      </section>
    );
// Mount Component {
  }
}
ReactDOM.render(<DrawerTest/>, mountNode);
// }
`
};

export default Drawer;
