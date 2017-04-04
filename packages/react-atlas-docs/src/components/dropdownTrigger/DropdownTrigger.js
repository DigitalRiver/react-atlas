import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class DropdownTrigger extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.DropdownTrigger {...this.props}></Atlas.DropdownTrigger>
    )
  }
}