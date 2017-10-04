import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Panel extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { className, children, style } = this.props;
        return (
            <div style={style} className={cx(className)}>
                {children}
            </div>
        );
    }
}

Panel.propTypes = {
    /**
     * Defines a custom css class name.
     * @examples '<Panel className="custom">This is a text hint</Panel>'
     */
    className: PropTypes.string,
    /**
     * Text to be displayed can be passed as a child.
     * @examples '<Panel>This is a text hint</Panel>'
     */
    children: PropTypes.node,

    /* Pass inline styles here. */
    style: PropTypes.node
};

export default Panel;
