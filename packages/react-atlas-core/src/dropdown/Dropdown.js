/*
Dropdown inspired and mostly taken from:
react-simple-dropdown
https://github.com/Fauntleroy/react-simple-dropdown
Copyright (c) 2015, Timothy Kempf <tim@kemp59f.info>
*/

import React, { cloneElement, Component, PropTypes } from "react";
import cx from 'classNames';
import { ButtonCore } from "../index";

/**
 * Simple Composable Dropdown Component that wraps DropdownTrigger and DropdownContent components. Primarily useful for Navigational dropdowns, not form select dropdowns.
 */
class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "active": false,
      "output": "Select One"
    };
  }

  _toggle = event => {
    this.setState({'active': !this.state.active});
  };

  _onWindowClick = event => {
    event.preventDefault();
    this.setState({'output': event.target.innerText, 
                   'active': !this.state.active});
  };

  render() {
    const { children, className, ...props } = this.props;
    const active = this.state.active;

    const classes = cx(
    {
      "content": true,
      "active": active,
      "container": true
    });

    const bound_children = React.Children.map(children, child => {
      let kid = <li styleName={"item"} onClick={this._onWindowClick}>{child}</li>
      return kid;
    });

    const buttonClasses = cx({
      'ra_button__button': true,
      'ra_button__default_btn': true,
      'ra_button__base': true,
      'ra_styles__bg-blue': true,
      'ra_styles__pad-v-1': true,
      'ra_styles__pad-h-2': true,
      'ra_styles__border': true,
      'ra_styles__cursor-pointer': true,
      'ra_styles__rounded': true,
      'ra_styles__white': true,
      'ra_styles__border-transparent': true,
      'ra_dropdown__dropdown-button': true
    });

    return (
      <div {...props} className={className} styleName={classes} onClick={this._toggle}>
        <ButtonCore className={buttonClasses}>{this.state.output}<i className="arrow"></i></ButtonCore>
        {this.state.active ? <div styleName={"list"}>{bound_children}</div> : null}
      </div>
    );
  }
}

Dropdown.defaultProps = {
  "className": ""
};

Dropdown.propTypes = {
  "active": PropTypes.bool,
  "onHide": PropTypes.bool,
  "onShow": PropTypes.bool,
  "children": PropTypes.node,
  "className": PropTypes.string
};

Dropdown.styleguide = {
  "category": "Navigation",
  "index": "5.2",
  "wrappedExample": true,
  "example": 
    `
// Dropdown Dummy Data {
var countries = [
  { value: 'EN-gb', label: 'England'},
  { value: 'ES-es', label: 'Spain'},
  { value: 'TH-th', label: 'Thailand'},
  { value: 'EN-en', label: 'USA'},
  { value: 'FR-fr', label: 'France'}
];
// }
// Internal Methods {
class DropdownExample extends React.Component {

  handleChange = (dropdown, value) => {
    const newState = {};
    newState[dropdown] = value;
    this.setState(newState);
  };

  render () {
// }
    return (
      <section>
        <h5>Dropdown</h5>
        <Dropdown>
          {countries.map((country, idx) => (country.label))}
        </Dropdown>
      </section>
    );
// Mount Component {
  }
}
ReactDOM.render(<DropdownExample/>, mountNode);
// }
`
  
};

export default Dropdown;
