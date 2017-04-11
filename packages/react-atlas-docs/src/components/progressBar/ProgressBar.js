import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class ProgressBar extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.ProgressBar {...this.props}></Atlas.ProgressBar>
    )
  }
}