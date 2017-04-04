import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class DropdownContent extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.DropdownContent {...this.props}></Atlas.DropdownContent>
    )
  }
}