import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Tooltip extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Tooltip {...this.props}></Atlas.Tooltip>
    )
  }
}