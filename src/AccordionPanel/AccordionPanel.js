import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import CSSModules from "react-css-modules";
import styles from "./AccordionPanel.css";

export class AccordionPanel extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const panelStyles = cx({
      accordionPanel: true
    });
    const { className, children, style } = this.props;
    return (
      <div style={style} className={cx(className)} styleName={panelStyles}>
        {children}
      </div>
    );
  }
}

AccordionPanel.propTypes = {
  /**
   * Text, any HTML element, or React Component.
   */
  children: PropTypes.node,

  /** An object, array, or string of CSS classes to apply to Panel.*/
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * Accordion will use the expanded prop from each child to determine if the child will be expanded on load.
   * @examples <Accordion><div>value 1</div><div expanded="true">value 2</div></Accordion>
   */
  expanded: PropTypes.bool,
  /**
   * Pass inline styling here.
   */
  style: PropTypes.object,
  /**
   * Accordion will use title prop from each child as the title for that child's header.
   * @examples <AccordionPanel title={title 1}>value 1</div><div title={title 2}>value 2</AccordionPanel>
   */
  title: PropTypes.string
};

AccordionPanel.defaultProps = {
  expanded: false
};

export default CSSModules(AccordionPanel, styles, { allowMultiple: true });
