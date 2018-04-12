import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

/**
 * TabPanel component
 */
class TabPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      "selected": this.props.selected || false
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.selected !== this.props.selected) {
      this.setState({ "selected": nextProps.selected });
    }
  };

  render() {
    const { className, children, bordered, vertical, style } = this.props;

    let tabPanelClasses = cx(
      {
        "selected": this.state.selected,
        bordered,
        vertical
      },
      "tabPanel"
    );

    return (
      <div className={cx(className)} styleName={tabPanelClasses} style={style}>
        {children}
      </div>
    );
  }
}

TabPanel.propTypes = {
    /**
     * Will be automatically set when bordered prop is passed to Tabs component.
     */
    "bordered": PropTypes.bool,

    /**
     * Text, components or elements that will be displayed as TabPanel content.
     */
    "children": PropTypes.node,

    /**
     * An object, array, or string of CSS classes to apply to TabPanel.
     */
    "className": PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array
    ]),

    /**
     * When true, TabPanel is selected.
     */
    "selected": PropTypes.bool,

    /**
     * Pass inline styling here.
     */
    "style": PropTypes.object,

    /**
     * Will be automatically set when vertical prop is passed to Tabs component.
     */
    "vertical": PropTypes.bool
};

export default TabPanel;
