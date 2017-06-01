import React from "react";
import PropTypes from 'prop-types';
import cx from 'classNames';
import { ButtonCore } from "../index";

const buttonClasses = cx({
  'ra_styles__rounded': true,
  'ra_dropdown__dropdown-button': true,
  'ra_button__button ra_button__default_btn': true,
  'ra_button__base': true,
  'ra_styles__marg-0': true,
  'ra_styles__bold': true,
  'ra_styles__button-pad-1': true,
  'ra_styles__border': true,
  'ra_styles__cursor-pointer': true,
  'ra_styles__charcoal': true,
  'ra_styles__border-med-grey': true,
});

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "active": false,
      "output": "Select One",
      "onChange": this.props.onChange
    };
  }

  componentDidMount() {
    window.addEventListener("click", this._onWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this._onWindowClick);
  }

  _onWindowClick = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if(this.state.active === true) {
        this.setState({'active': false});
      }
    }
  };

  _toggle = event => {
    this.setState({'active': !this.state.active});
  };

  _clickHandler = (i, event) => {
    const selected = event.target.innerText;
    this.setState({'output': selected, 
                   'active': !this.state.active,
                   'index': i});
    this.state.onChange(selected);
  };

  render() {
    const { children, className, onChange, ...props } = this.props;
    const active = this.state.active;

    const classes = cx(
    {
      "content": true,
      "active": active,
      "container": true
    });

    const bound_children = children.map((child, i) => {
      if(i === this.state.index) {
        let kid = <li key={i} styleName={"selected"} onClick={this._clickHandler.bind(this, i)}>{child}</li>
        return kid;
      }

      let kid = <li key={i} styleName={"item"} onClick={this._clickHandler.bind(this, i)}>{child}</li>
      return kid;
     
    });

    return (
      <div {...props} ref={(node) => (this.wrapperRef = node)} className={className} styleName={classes} onClick={this._toggle}>
        <ButtonCore className={buttonClasses}>{this.state.output}<i styleName="arrow"></i></ButtonCore>
        {this.state.active ? <div styleName={"list"}>{bound_children}</div> : null}
      </div>
    );
  }
}

Dropdown.propTypes = {
  /* Boolean value taht tells the dropdown wether to
    be open or not.*/
  "active": PropTypes.bool,

  /* A callback funtion that is called when a new menu item is selected. */
  "onChange": PropTypes.func,

  /* The children elements to be wrapped by the dropdown menu. */
  "children": PropTypes.node,

  /* Pass CSS styles to className to set them on the dropdown component. */
  "className": PropTypes.string
};

export default Dropdown;
