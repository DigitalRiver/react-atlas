import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

/**
 * Tab component
 */
class Tab extends React.PureComponent {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      "selected": this.props.selected,
      "disabled": this.props.disabled
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.selected !== this.props.selected) {
      this.setState({ "selected": nextProps.selected });
    }
  };

  _handleClick = event => {
    let selected = this.props.tabIndex;

    if (!this.state.disabled) {
      this.props.setSelectedTab(selected, event);
    }
  };

  render() {
    const { className, children, vertical, icon, style } = this.props;

    let tabClasses = cx({
      "tab": !vertical,
      "vTab": vertical,
      "selected": this.state.selected && !vertical,
      "vSelected": this.state.selected && vertical,
      "disabled": this.state.disabled
    });

    return (
      <li
        className={cx(className)}
        styleName={tabClasses}
        style={style}
        onClick={this._handleClick}
      >
        {icon ? <i className={cx(icon, "ra_Tab__icon-left")} /> : null}
        {children}
      </li>
    );
  }
}

Tab.propTypes = {
  /**
   * Child components or elements to be displayed as the title on Tab.
   */
  "children": PropTypes.node,

  /**
   * An object, array, or string of CSS classes to apply to Tab.
   */
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /**
   * When true, Tab sill be disabled.
   */
  "disabled": PropTypes.bool,

  /**
   * The CSS class name for the icon that will be displayed on Tab.
   */
  "icon": PropTypes.string,

  /**
   * When true, Tab will be selected.
   */
  "selected": PropTypes.bool,

  /**
   * Function to be executed when a Tab is selected.
   */
  "setSelectedTab": PropTypes.func.isRequired,

  /**
   * Pass inline styling here.
   */
  "style": PropTypes.object,

  /**
   * Tab index.
   */
  "tabIndex": PropTypes.number.isRequired,

  /**
   * When true, Tabs will display vertically.
   */
  "vertical": PropTypes.bool
};

Tab.defaultProps = {
  "selected": false,
  "disabled": false
};

export default Tab;
