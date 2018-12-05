import React, { cloneElement } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Label } from "../Label";
import CSSModules from "react-css-modules";
import styles from "./RadioGroup.css";

export class RadioGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    // Initial state
    this.state = {
      checkedRadio: this.props.selectedIndex || 0
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex) {
      this.setState({ checkedRadio: nextProps.selectedIndex });
    }
  }

  groupSetChecked = (e, index) => {
    e.persist();
    if (index !== this.state.checkedRadio) {
      if (this.props.onChange) {
        this.props.onChange(e, index);
      }
      this.setState({ checkedRadio: index });
    }
  };

  render() {
    const {
      className,
      children,
      inline,
      inlineChildren,
      name,
      style,
      title
    } = this.props;

    const radioGroupStyles = cx({
      radioGroup: !inline,
      inline: inline
    });

    const radioButtons = React.Children.map(children, (child, index) => {
      child = cloneElement(child, {
        inline: inlineChildren,
        name: name ? name : child.props.name,
        groupSetChecked: this.groupSetChecked,
        checked: this.state.checkedRadio === index,
        index: index
      });
      return child;
    });

    let radioGroupTitle = title && <Label inline={inline} label={title} />;

    return (
      <div style={style} className={cx(className)} styleName={radioGroupStyles}>
        {radioGroupTitle}
        {radioButtons}
      </div>
    );
  }
}

RadioGroup.propTypes = {
  /**
   * Child elements, typically Radio components.
   * @examples '<RadioGroup><Radio/><Radio/></RadioGroup>'
   */
  children: PropTypes.node.isRequired,

  /** An object, array, or string of CSS classes to apply to RadioGroup.*/
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),

  /**
   * When true, RadioGroup will display inline.
   * @examples '<RadioGroup inline></RadioGroup>'
   */
  inline: PropTypes.bool,

  /**
   * When true, children will display inline.
   * @examples '<RadioGroup inlineChildren></RadioGroup>'
   */
  inlineChildren: PropTypes.bool,
  /**
   * Sets a handler function to be executed when the selected value of the RadioGroup changes.
   * @examples '<RadioGroup onChange={onChangeHandler}>'
   */
  onChange: PropTypes.func,

  /**
   * Form name for the element, this will set all Radio children the same form name (so they can't be selected at the same time).
   * @examples '<RadioGroup name="test"></RadioGroup>'
   */
  name: PropTypes.string,

  /**
   * Pass inline styling here.
   */
  style: PropTypes.object,

  /**
   * Will define the selected/checked Radio component in the RadioGroup.
   */
  selectedIndex: PropTypes.number,
  /**
   * Defines the element title.
   * @examples '<RadioGroup title="Test"></RadioGroup>'
   */
  title: PropTypes.string
};

RadioGroup.defaultProps = {
  selectedIndex: null
};

RadioGroup.displayName = "RadioGroup"; // Used for identifying this component from a parent Form

export default CSSModules(RadioGroup, styles, { allowMultiple: true });
