import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class Tfoot extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.Tfoot {...this.props}></Atlas.Tfoot>
    )
  }
}