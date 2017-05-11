import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';
export default class TableHeader extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    let {children, ...props} = this.props;
    return (
      <Atlas.TableHeader {...props}>{children}</Atlas.TableHeader>
    )
  }
}

TableHeader.propTypes = {
  /**
   * Define a mini button.
   *
   */
  "mini": PropTypes.bool
};