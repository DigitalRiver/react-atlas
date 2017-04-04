import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class DropdownListItem extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.DropdownListItem {...this.props}></Atlas.DropdownListItem>
    )
  }
}