import React, { PropTypes } from 'react';
import { classNames } from '../utils';
import Overlay from "../overlay";
import themeable from 'react-themeable';

const Dialog = ({body, active, type, children, className, onOverlayClick, ...props}) => {

    const theme = themeable(props.theme);
    const componentClasses = classNames({
        inactive: !active,
        type,
        active,
        className
    });

    return (
        <Overlay active={active} onClick={onOverlayClick}>
            <div {...theme(1, ...componentClasses)}>
                <section className={body}>
                    {children}
                </section>
            </div>
        </Overlay>
    );
};

Dialog.propTypes = {
  /**
   * defines if Dialog modal is active/open/popped-up.
   */
    active: PropTypes.bool,
	/**
   * The content inside the modal
   */
  children: PropTypes.node,
    className: PropTypes.string,
	/**
   * Defines what should happen when someone clicks off of the Modal box
   */
  onOverlayClick: PropTypes.func,
	/**
   * What type/size of modal. Choose from 'small', 'normal', 'large'.
   */
  type: PropTypes.oneOf(["large","small","normal"]),
  body: PropTypes.string
};

Dialog.defaultProps = {
    active: false,
    type: "normal",
    className: '',
    theme: {
      inactive: true
    }
};

Dialog.styleguide = {
  category: "Layout",
  index: "4.2",
  wrappedExample: true,
  example:`
// Internal Methods {
class App extends React.Component {
  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({
      active: !this.state.active
    });
  };
// }
  render () {
    return (
      <section>
        <h5>Dialog</h5>
        <p>lorem ipsum...</p>
        <Button onClick={this.handleToggle}>Show Dialog</Button>
        <Dialog
          active={this.state.active}
          onOverlayClick={this.handleToggle}
        >
          <h6><strong>Use Google's location service?</strong></h6>
          <p>Let Google help apps <strong>determine location</strong>. This means sending anonymous location data to Google, even when no apps are running.</p>

          <Button warning onClick={this.handleToggle}>Disagree</Button>
          <Button success onClick={this.handleToggle}>Agree</Button>
        </Dialog>
      </section>
    );
  }
// Mount Component {
}

ReactDOM.render(<App/>, mountNode);
// }
  `
};

export default Dialog;
