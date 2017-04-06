import React, { PropTypes } from "react";
import * as Atlas from 'react-atlas';

export default class GridRow extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Atlas.GridRow {...this.props}></Atlas.GridRow>
    )
  }
}