import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Th extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Th {...this.props}></Atlas.Th>
    )
  }
}