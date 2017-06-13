import React from "react";
import PropTypes from 'prop-types';
import cx from "classNames";

/**
 * Individual Tab component used within `<Tabs>`. Can be disabled, hidden and also sent an onActive event trigger.
 */
class Tab extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.active && this.props.active && this.props.onActive) {
      this.props.onActive();
    }
  }

  _handleClick = () => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(this.props.index);
    }
  };

  _handleActive = () => {
    if (!this.props.disabled && this.props.onActive) {
      this.props.onActive();
    }
  };

  render() {
    let { active, className, hidden, disabled, label, ...other } = this.props;

    const classes = cx({
      "label": !active && !hidden && !disabled,
      active,
      hidden,
      disabled
    });

    return (
      <label
        {...other}
        styleName={classes}
        onClick={this._handleClick}
        onActive={this._handleActive}
        className={cx(className)}
      >
        {label}
      </label>
    );
  }
}

Tab.propTypes = {
  "active": PropTypes.bool,
  /**
     * Defines a custom css class name.
     * @examples 'tab', 'label'
     */
  "className": PropTypes.string,
  /**
   * Determines if the tab is disabled.
   * @examples '<Tab disabled/>'
   */
  "disabled": PropTypes.bool,
  /**
   * Determines if the tab is hidden.
   * @examples '<Tab hidden/>'
   */
  "hidden": PropTypes.bool,
  /**
   * Determines label text on the tab navbar.
   * @examples '<Tab label="Tab 1"/>'
   */
  "label": PropTypes.string,
  /**
     * Sets a handler function to be executed when custom onActive event occurs.
     * @examples <Tab onClick={this._tabOnActive}>(...)</Tabs>
     */
  "onActive": PropTypes.func,
  /**
     * Sets a handler function to be executed when onClick event occurs.
     * @examples <Tab onClick={this._tabOnClick}>(...)</Tabs>
     */
  "onClick": PropTypes.func,
  /**
     * Tab index
     * @examples 0,1,2,3,4
     */
  "index": PropTypes.number
};

Tab.defaultProps = {
  "className": "",
  "active": false,
  "disabled": false,
  "hidden": false,
  "label": "Tab Title"
};

export default Tab;
