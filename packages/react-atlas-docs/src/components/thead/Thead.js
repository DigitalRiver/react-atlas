import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Thead extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Thead {...this.props}></Atlas.Thead>
    )
  }
}