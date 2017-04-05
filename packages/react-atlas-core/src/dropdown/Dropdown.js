import React from "react";
import cx from 'classNames';
import { ButtonCore } from "../index";

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

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "active": false,
      "output": "Select One",
      "onChange": this.props.onChange
    };
  }

  _toggle = event => {
    this.setState({'active': !this.state.active});
  };

  _onWindowClick = event => {
    const selected = event.target.innerText;
    this.setState({'output': selected, 
                   'active': !this.state.active});
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

    const bound_children = React.Children.map(children, child => {
      let kid = <li styleName={"item"} onClick={this._onWindowClick}>{child}</li>
      return kid;
    });

    return (
      <div {...props} className={className} styleName={classes} onClick={this._toggle}>
        <ButtonCore className={buttonClasses}>{this.state.output}<i className="arrow"></i></ButtonCore>
        {this.state.active ? <div styleName={"list"}>{bound_children}</div> : null}
      </div>
    );
  }
}

Dropdown.propTypes = {
  "active": React.PropTypes.bool,
  "onChange": React.PropTypes.func,
  "children": React.PropTypes.node,
  "className": React.PropTypes.string
};

export default Dropdown;
