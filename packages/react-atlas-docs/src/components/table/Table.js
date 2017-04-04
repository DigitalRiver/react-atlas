import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Table extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Table {...this.props}></Atlas.Table>
    )
  }
}