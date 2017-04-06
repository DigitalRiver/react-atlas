import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class ListItem extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.ListItem {...this.props}></Atlas.ListItem>
    )
  }
}