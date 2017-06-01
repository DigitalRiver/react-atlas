import React, { PropTypes } from "react";
import cx from "classNames";

/**
 * Used within the `<Tabs>` Component to programatically determine the content of any given tab. There probably isn't any reason for you to actually use `<TabContent>` directly.
 */
const TabContent = ({ active, tabIndex, children, className, ...props }) => {
  const classes = cx({
    "tabContent": true,
    "tabActive": active
  });

  return (
    <section {...props} styleName={classes} className={cx(className)} tabIndex={tabIndex}>
      {children}
    </section>
  );
};

TabContent.propTypes = {
  /**
   * Determines if the tab content is active (depends on tab active index).
   */
  "active": PropTypes.bool,
  /**
     * Children components (any markup to be displayed when tab is active).
     * @examples <TabContent><h3>Tab 1</h3><p>Lorem ipsum</p></TabContent>
     */
  "children": PropTypes.node,
  /**
     * Defines a custom css class name.
     * @examples 'tabContent', 'tabActive'
     */
  "className": PropTypes.string,
  /**
     * Tab index related to the content.
     * @examples 0,1,2,3,4
     */
  "tabIndex": PropTypes.number
};
TabContent.defaultProps = {
  "className": "",
  "active": false
};

export default TabContent;
