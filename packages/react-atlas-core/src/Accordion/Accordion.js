import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import messages from "../utils/messages";

/**
 * The Accordion component creates an expandable tab structure for displaying content. The traditional child element used within Accordion is the Panel component, but a regular div will work as well.
 * @examples <Accordion><Panel title="Accordion Title">Some text</Panel><Panel title="Accordion Title 2">Some more text</Panel></Accordion>
 *
 */
class Accordion extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      "activeChildArray": this._getExpandedPanels(this.props.children),
      "hover": null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.state.children) {
      this.setState({
        "activeChildArray": this._getExpandedPanels(nextProps.children)
      });
    }
  }

  _getExpandedPanels = children => {
    let childArray = [];
    children.map(child => {
      if (child.props.expanded) {
        childArray.push(true);
      } else {
        childArray.push(false);
      }
    });
    return childArray;
  };

  // click handler for header.  Sets activeChildArray value accordingly to expand and collapse the panels
  _click = (index, event) => {
    if (!this.props.disabled) {
      let newChildArray = [];
      for (let i = 0; i < this.state.activeChildArray.length; i++) {
        if (i === index) {
          newChildArray.push(!this.state.activeChildArray[i]);
        } else if (
          !this.props.multiOpen &&
          !this.state.activeChildArray[index]
        ) {
          newChildArray.push(false);
        } else {
          newChildArray.push(this.state.activeChildArray[i]);
        }
      }
      if (this.props.onClick) {
        this.props.onClick(index, event, this.props.children[index].props);
      }
      this.setState({
        "activeChildArray": newChildArray
      });
    }
  };

  _mouseEnter = index => {
    this.setState({
      "hover": index
    });
  };

  _mouseLeave = () => {
    this.setState({
      "hover": null
    });
  };

  // expandAll function to expand all panels.  Sets value of all to true in activeChildArray
  _expandAll = () => {
    let newChildArray = [];
    const isFalse = function(element) {
      return element === false;
    };
    const anyCollapsed = this.state.activeChildArray.some(isFalse);
    for (let i = 0; i < this.state.activeChildArray.length; i++) {
      newChildArray.push(anyCollapsed);
    }
    this.setState({
      "activeChildArray": newChildArray
    });
  };

  render() {
    let {
      className,
      children,
      disabled,
      width,
      titlePosition,
      style
    } = this.props;

    // A list of children of the Accordion component
    const accordion_panels = React.Children.map(children, (child, i) => {
      const headerStateClasses = cx({
        "accordion_header": true,
        "rightAlign": titlePosition === "right",
        "centerAlign": titlePosition === "center",
        "header-active": this.state.activeChildArray[i] === true,
        "header-inactive":
          this.state.activeChildArray[i] === false &&
          (this.state.hover !== i || disabled),
        "hover": this.state.hover === i && !disabled,
        disabled
      });

      const stateClasses = cx({
        "active": this.state.activeChildArray[i],
        "inactive": !this.state.activeChildArray[i]
      });

      const headerClasses = cx(headerStateClasses);
      const panelClasses = cx(stateClasses);

      let accordion_panel = 
        <div>
          <div
            styleName={headerClasses}
            onClick={e => {
              this._click(i, e);
            }}
            onMouseEnter={() => {
              this._mouseEnter(i);
            }}
            onMouseLeave={() => {
              this._mouseLeave(i);
            }}
          >
            {child.props.title}
          </div>
          <div styleName={panelClasses}>
            { this.state.activeChildArray[i] === true && 
              <div styleName={"panel"}>{child}</div>
            }
          </div>
        </div>
      ;
      return accordion_panel;
    });

    return (
      <div className={cx(className)} style={style}>
        {this.props.expandAll && !this.props.disabled ? 
          <div
            styleName={"expandAll"}
            onClick={() => {
              this._expandAll();
            }}
          >
            {messages.expandAll}
          </div>
         : null}
        <div styleName={"accordion"} style={{ "width": width }}>
          {accordion_panels}
        </div>
      </div>
    );
  }
}

Accordion.propTypes = {
  /**
   * Children should be either a string, an icon/glyphicon, or an image tag.
   * @examples "SomeName", <Accordion>{child}{child}</Accordion>
   */
  "children": PropTypes.node,
  /** An object, array, or string of CSS classes to apply to Accordion.*/
  "className": PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  /**
   * When true, Accordion component will be disabled.
   */
  "disabled": PropTypes.bool,
  /**
   * When true, Accordion will display an "expand all" link that will open all panels.
   * @examples <Accordion expandAll={true}>{children}</Accordion>
   */
  "expandAll": PropTypes.bool,
  /**
   * Accordion will use the expanded prop from each child to determine if the child will be expanded on load.
   * @examples <Accordion><div>value 1</div><div expanded>value 2</div></Accordion>
   */
  "expanded": PropTypes.bool,
  /**
   * When true, Accordion will allow multiple open panels.
   * @examples <Accordion multiOpen={true}>{children}</Accordion>
   */
  "multiOpen": PropTypes.bool,
  /**
   * Function that will be executed on click.
   */
  "onClick": PropTypes.func,
  /**
   * Pass inline styles here.
   */
  "style": PropTypes.object,
  /**
   * Accordion will use title prop from each child as the title for that child's header.
   * @examples <Accordion><div title={title 1}>value 1</div><div title={title 2}>value 2</div></Accordion>
   */
  "title": PropTypes.string,
  /**
   * Will set the Accordion's title text position left, right, or center.
   * @examples <Accordion titlePosition={left}>{children}</Accordion>
   */
  "titlePosition": PropTypes.string,
  /**
   * Will set the width of the Accordion.
   */
  "width": PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Accordion.defaultProps = {
  "width": "100%",
  "disabled": false,
  "expandAll": false,
  "multiOpen": false
};

export default Accordion;
