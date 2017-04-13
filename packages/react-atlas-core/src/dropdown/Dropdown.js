import React from "react";
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

  _clickHandler = event => {
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
        let kid = <li styleName={"item"} onClick={this._clickHandler}>{child}</li>
        return kid;
    });

    return (
      <div {...props} ref={(node) => (this.wrapperRef = node)} className={className} styleName={classes} onClick={this._toggle}>
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
