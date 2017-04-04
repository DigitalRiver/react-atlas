import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Checkbox extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Checkbox {...this.props}></Atlas.Checkbox>
    )
  }
}